import { supabase } from "./supabase";

export async function createMediaAsset(mediaData: any) {
	const { data, error } = await supabase
		.from("media_assets")
		.insert({
			title: mediaData.title,
			asset_type: mediaData.asset_type,
			storage_url: mediaData.storage_url,
			source_text: mediaData.source_text,
			embedding: mediaData.embedding || null,
			eventId: mediaData.eventId || null,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function updateMediaAsset(mediaId: string, mediaData: any) {
	const { data, error } = await supabase
		.from("media_assets")
		.update({
			title: mediaData.title,
			asset_type: mediaData.asset_type,
			storage_url: mediaData.storage_url,
			source_text: mediaData.source_text,
			embedding: mediaData.embedding || null,
			eventId: mediaData.eventId || null,
		})
		.eq("id", mediaId)
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function deleteMediaAsset(mediaId: string) {
	const { error } = await supabase
		.from("media_assets")
		.delete()
		.eq("id", mediaId);
	if (error) throw error;
}

export async function getMediaAssets() {
	const { data, error } = await supabase
		.from("media_assets")
		.select()
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
}
