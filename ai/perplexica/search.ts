import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

import {
	getAvailableEmbeddingModelProviders,
	getChatModel,
} from "../providers";
import { searchHandlers } from "../messageHandler";
import {
	AIMessage,
	BaseMessage,
	HumanMessage,
	MessageContentText,
} from "@langchain/core/messages";
import { MetaSearchAgentType } from "../search/metaSearchAgent";
import { Embeddings } from "@langchain/core/embeddings";
import EventEmitter from "eventemitter3";
import { Document } from "langchain/document";
import { DeepChatOpenAI } from "../providers/openai";
import { RemoteFileAttachment } from "@/types/attachment";
import { JinaAIEmbeddings } from "@/lib/tools/jina-embedding";

// Add this utility function to convert EventEmitter to AsyncIterator
export function on(emitter: EventEmitter, event: string) {
	const queue: any[] = [];
	const resolvers: ((value: IteratorResult<any>) => void)[] = [];
	let finished = false;

	const listener = (data: any) => {
		if (resolvers.length > 0) {
			resolvers.shift()!({ value: data, done: false });
		} else {
			queue.push(data);
		}
	};

	const endListener = () => {
		if (resolvers.length > 0) {
			resolvers.shift()!({ value: undefined, done: true });
		}
		finished = true;
	};

	emitter.on(event, listener);
	emitter.on("end", endListener); // Listen for the 'end' event

	return {
		[Symbol.asyncIterator]() {
			return this;
		},
		next() {
			return new Promise((resolve) => {
				if (queue.length > 0) {
					resolve({ value: queue.shift(), done: false });
				} else if (finished) {
					resolve({ value: undefined, done: true });
				} else {
					resolvers.push(resolve);
				}
			});
		},
		return() {
			// Clean up listeners when the consumer stops listening
			emitter.removeListener(event, listener);
			emitter.removeListener("end", endListener);
			return Promise.resolve({ done: true });
		},
	};
}
export interface chatModel {
	provider: string;
	model: string;
	apiKey: string;
	customOpenAIBaseURL?: string;
	customOpenAIKey?: string;
}

async function* streamSearchResponse(
	query: MessageContentText[],
	history: BaseMessage[],
	llm: BaseChatModel,
	embeddings: Embeddings | undefined,
	searchHandler: MetaSearchAgentType,
	attachments: RemoteFileAttachment[] = []
) {
	const emitter = await searchHandler.searchAndAnswer(
		query,
		history,
		llm,
		embeddings,
		attachments
	);

	let message = "";
	let reasoning_content = "";
	let sources: Document[] = [];

	try {
		for await (const event of on(emitter, "data") as any) {
			const parsedData = JSON.parse(event);
			if (parsedData.type === "end") {
				yield { type: "end", message, sources };
				break;
			}
			if (parsedData.type === "response") {
				if (!parsedData.data && message.length > 0) break;
				message += parsedData.data;
				yield { type: "message", data: parsedData.data };
			} else if (parsedData.type == "reasoning") {
				reasoning_content += parsedData.data;
				yield { type: "reasoning", data: parsedData.data };
			} else if (parsedData.type === "sources") {
				sources = parsedData.data;
				yield { type: "sources", data: parsedData.data };
			} else if (parsedData.type === "action") {
				console.log("action", parsedData.data);
				yield { type: "action", data: parsedData.data };
			} else if (parsedData.type === "error") {
				yield { type: "error", data: parsedData.data };
				break;
			}
		}
		console.log("End stream");
		yield { type: "end", message, sources };
	} catch (error) {
		yield {
			type: "error",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
export interface ChatRequestBody {
	query: MessageContentText[];
	history: Array<[string, any]>;
	attachments?: RemoteFileAttachment[];
}
export interface UserChatRequestBody {
	optimizationMode: "speed" | "balanced";
	query: MessageContentText[];
	history: Array<[string, any]>;
	attachments?: RemoteFileAttachment[];
}
async function initializeModels() {
	const llm = (await getChatModel(
		"gemini",
		"AIzaSyBYxVUmc2y3lpA97ITqk4ZXY4mOSsOHZ6g",
		"gemini-2.5-flash"
	)) as BaseChatModel;
	const additional = {
		model: "jina-embeddings-v3",
		task: "retrieval.query" as const,
		late_chunking: true,
		dimensions: 768,
	};
	const embeddings = new JinaAIEmbeddings({
		apiKey: "jina_ff70fcb79ac341dcafad18970b711b67bjuoz_pC_DiS1dAFESA_AX25g7uP",
		...additional,
	});
	return { llm, embeddings };
}

export async function* handleChatRequest(body: ChatRequestBody) {
	try {
		const { llm, embeddings } = await initializeModels();
		const searchHandler = (searchHandlers as any)["academicSearch"];
		if (!searchHandler) {
			throw new Error("Invalid focus mode");
		}

		const history = body.history.map((msg) => {
			if (msg[0] === "user") {
				return new HumanMessage({ content: msg[1] });
			} else if (msg[0] === "assistant") {
				return new AIMessage({ content: msg[1] });
			} else {
				throw new Error("Unknown message type in history");
			}
		});

		yield* streamSearchResponse(
			body.query,
			history,
			llm,
			embeddings,
			searchHandler,
			body.attachments
		);
	} catch (error: any) {
		console.error("Error streaming response: " + error.message);
		yield {
			type: "error",
			data: error.message,
		};
	}
}
