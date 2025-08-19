import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { JinaAIEmbeddings } from "./jina-embedding";
const additional = {
  model: "jina-embeddings-v3",
  task: "retrieval.passage" as const,
  late_chunking: true,
  dimensions: 768,
};

import { SupabaseClient } from "@supabase/supabase-js";

const apiKey = process.env.JINA_API_KEY;

/**
 * Takes a source's content, splits it into chunks, creates embeddings for each chunk
 * using LangChain, and inserts them into the 'documents' table.
 *
 * @param sourceId The UUID of the parent source.
 * @param content The full text content to be chunked and embedded.
 * @param metadata A JSON object with additional details about the source.
 * @returns The number of chunks that were successfully created and stored.
 */
export async function createEmbeddingsWithLangChain(
  supabase: SupabaseClient<any, "public", any>,
  sourceId: string,
  content: string,
  metadata: Record<string, any>
) {
  // 1. Initialize LangChain components
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10000,
    chunkOverlap: 500,
  });
  const embeddings = new JinaAIEmbeddings({
    apiKey: apiKey,
    ...additional,
  });

  // 1. Split the content into text chunks
  const initialChunks = await splitter.splitText(content);

  // 2. *** THE FIX: Filter out any empty or whitespace-only chunks ***
  const chunks = initialChunks.filter((chunk) => chunk.trim() !== "");

  // Log the difference for debugging
  console.log(
    `Initial chunks: ${initialChunks.length}, Filtered chunks: ${chunks.length}`
  );

  if (chunks.length === 0) {
    console.log("No valid chunks to process after filtering.");
    throw new Error("No valid chunks to process after filtering.");
  }

  // 3. Create an embedding for each chunk
  // embedDocuments is efficient as it can make batch requests.
  const chunkEmbeddings = await embeddings.embedDocuments(chunks);
  chunkEmbeddings.map((chunkEmb, index) => {
    if (chunkEmb.length == 0) {
      console.log("🚀 ~ createEmbeddingsWithLangChain ~ chunkEmb:", chunkEmb);
      console.log("🚀 ~ createEmbeddingsWithLangChain ~ index:", index);
    }
  });
  console.log("Embeddings created for all chunks.");

  // 4. Combine chunks, embeddings, and metadata into objects for insertion
  // This is the key step that perfectly matches your schema.
  const documentsToInsert = chunks.map((chunk, index) => ({
    source_id: sourceId, // The dedicated foreign key column
    content: chunk, // The text content of this specific chunk
    embedding: chunkEmbeddings[index], // The vector for this chunk
    metadata: metadata, // The metadata object, which is the same for all chunks
  }));

  // 5. Insert all the new documents into Supabase in a single batch
  const { error } = await supabase.from("document").insert(documentsToInsert);

  if (error) {
    console.error("Error inserting documents into Supabase:", error);
    throw new Error(error.message);
  }

  console.log(
    `Successfully inserted ${documentsToInsert.length} documents into the database.`
  );

  return documentsToInsert.length;
}
