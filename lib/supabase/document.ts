import { supabase } from "./supabase";

export async function searchDocuments(
	queryEmbedding: number[],
	filter: any = {},
	matchThreshold: number = 0.78,
	matchCount: number = 10
) {
	const { data, error } = await supabase.rpc("match_documents", {
		query_embedding: queryEmbedding,
		filter,
		match_threshold: matchThreshold,
		match_count: matchCount,
	});

	if (error) throw error;
	return data;
}
