import MetaAgent from "./search/metaAgent";
import prompts from "./prompts";

export const Handlers = {
	academicSearch: new MetaAgent({
		activeEngines: ["arxiv", "google scholar", "pubmed"],
		queryGeneratorPrompt: prompts.academicSearchRetrieverPrompt,
		responsePrompt: prompts.academicSearchResponsePrompt,
		rerank: true,
		rerankThreshold: 0,
		searchWeb: true,
		summarizer: false,
	}),
	titleGenerator: new MetaAgent({
		activeEngines: ["title"],
		queryGeneratorPrompt: "",
		responsePrompt: prompts.titleGeneratorResponsePrompt,
		rerank: false,
		rerankThreshold: 0,
		searchWeb: false,
		summarizer: false,
	}),
};

export type THandlersKeys = keyof typeof Handlers;
