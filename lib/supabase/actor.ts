import { supabase } from "./supabase";

export async function getActors() {
	const { data, error } = await supabase.from("actor").select().order("name");

	if (error) throw error;
	return data;
}

export async function createActor(actorData: any) {
	const { data, error } = await supabase
		.from("actor")
		.insert({
			name: actorData.name,
			actor_type: actorData.actor_type,
			description: actorData.description,
			birth_date: actorData.birth_date || null,
			death_date: actorData.death_date || null,
			founded_date: actorData.founded_date || null,
			dissolved_date: actorData.dissolved_date || null,
			nationality: actorData.nationality || null,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function updateActor(actorId: string, actorData: any) {
	const { data, error } = await supabase
		.from("actor")
		.update({
			name: actorData.name,
			actor_type: actorData.actor_type,
			description: actorData.description,
			birth_date: actorData.birth_date || null,
			death_date: actorData.death_date || null,
			founded_date: actorData.founded_date || null,
			dissolved_date: actorData.dissolved_date || null,
			nationality: actorData.nationality || null,
		})
		.eq("id", actorId)
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function deleteActor(actorId: string) {
	await supabase.from("actor_links").delete().eq("actorId", actorId);

	const { error } = await supabase.from("actor").delete().eq("id", actorId);
	if (error) throw error;
}
