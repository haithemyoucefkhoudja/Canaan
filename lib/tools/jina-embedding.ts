// File: lib/jina-embeddings.ts

import { getEnvironmentVariable } from "@langchain/core/utils/env";
import { chunkArray } from "@langchain/core/utils/chunk_array";
import { Embeddings, type EmbeddingsParams } from "@langchain/core/embeddings";

export interface JinaAIEmbeddingsParams extends EmbeddingsParams {
  apiKey?: string;
  model?: string;
  task?:
    | "retrieval.document"
    | "retrieval.query"
    | "retrieval.passage"
    | "classification.claim"
    | "classification.sentence"
    | "reranking.pair";
  dimensions?: number;
  late_chunking?: boolean;
  /**
   * The number of documents to embed in a single API call.
   * @default 512
   */
  batchSize?: number;
}

export class JinaAIEmbeddings extends Embeddings {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly task?: string;
  private readonly dimensions?: number;
  private readonly late_chunking?: boolean;
  private readonly batchSize: number;

  private readonly apiUrl = "https://api.jina.ai/v1/embeddings";

  constructor(fields?: JinaAIEmbeddingsParams) {
    super(fields ?? {});

    this.apiKey =
      (fields?.apiKey ?? getEnvironmentVariable("JINA_API_KEY")) || "";
    if (!this.apiKey) {
      throw new Error(
        "Jina AI API key not found. Please set the JINA_API_KEY environment variable or pass it to the constructor."
      );
    }

    this.model = fields?.model ?? "jina-embeddings-v4";
    this.batchSize = fields?.batchSize ?? 512; // A safe default batch size
    this.task = fields?.task;
    this.dimensions = fields?.dimensions;
    this.late_chunking = fields?.late_chunking;
  }

  /**
   * Generates embeddings for a list of documents. This method handles batching.
   * Note: The base class in `@langchain/core` would normally handle this batching if we
   * implemented `_embedDocuments`. We are overriding the public method here for full control,
   * similar to the older community class pattern you referenced.
   */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    const batches = texts;

    const batchRequests = batches.map((ele) => ({ text: ele }));

    const batchResponses = await this._callApi(batchRequests);
    console.log(
      "🚀 ~ JinaAIEmbeddings ~ embedDocuments ~ batchResponses:",
      batchResponses
    );

    // The Jina API returns embeddings in the same order as the input array.
    // We just need to flatten the results from all the batches.
    const embeddings: number[][] = [];
    for (let i = 0; i < batchResponses.length; i += 1) {
      const batch = batches[i];
      const batchResponse = batchResponses[i] || [];
      for (let j = 0; j < batch.length; j += 1) {
        embeddings.push(batchResponse[j]);
      }
    }
    return embeddings;
  }

  /**
   * Generates an embedding for a single query text.
   */
  async embedQuery(text: string): Promise<number[]> {
    // const embeddings = await this._callApi(text);
    return [];
  }

  /**
   * Private method to make the actual API call.
   * It accepts either a single string or an array of strings (a batch).
   */
  private async _callApi(
    input: string | { text: string }[]
  ): Promise<Array<number[][]>> {
    const body: Record<string, unknown> = {
      model: this.model,
      input: input,
    };
    if (this.task) body.task = this.task;
    if (this.dimensions) body.dimensions = this.dimensions;
    if (this.late_chunking !== undefined)
      body.late_chunking = this.late_chunking;

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const detail = errorData.detail || JSON.stringify(errorData);
      throw new Error(
        `Jina AI API request failed with status ${response.status}: ${detail}`
      );
    }

    const json = await response.json();

    // The API returns an array of objects like { index: 0, embedding: [...] }
    // We must sort by index to guarantee the order matches the input batch.
    const sortedData: Array<number[][]> = json.data.sort(
      (a: any, b: any) => a.index - b.index
    );
    return sortedData.map((item: any) => item.embedding);
  }
}
