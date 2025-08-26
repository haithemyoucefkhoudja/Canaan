import { supabase } from "./supabase";

// Database query functions
export async function getEvents() {
	const { data, error } = await supabase
		.from("events")
		.select(
			`
        *,
        sourceLinks:source_links (
          source:source (*)
        ),
        actorLinks:actor_links (
          role,
          actor:actor (*)
        ),
        mediaAssets:media_assets (*),
        sourceRelationships:event_relationships!source_event_id (*),
        targetRelationships:event_relationships!target_event_id (*)
      `
		)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
}

export async function getEventById(id: string) {
	const { data, error } = await supabase
		.from("events")
		.select(
			`
        *,
        sourceLinks:source_links (
          source:source (*)
        ),
        mediaAssets:media_assets (*),
        actorLinks:actor_links (
          actor:actor (*)
        ),
        locationLinks:location_links (
          location:location (*)
        )
      `
		)
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
}

export async function getEventRelationships() {
	const { data, error } = await supabase.from("event_relationships").select(`
        *,
        sourceEvent:events!source_event_id (*),
        targetEvent:events!target_event_id (*)
      `);

	if (error) throw error;
	return data;
}

// Create functions
export async function createEvent(
	eventData: any,
	sourceIds: string[] = [],
	actorLinks: { actorId: string; role: string }[] = []
) {
	const { data: event, error: eventError } = await supabase
		.from("events")
		.insert({
			name: eventData.name,
			description: eventData.description,
			start_date: eventData.start_date || null,
			end_date: eventData.end_date || null,
			location: eventData.location,
			coordinates: eventData.coordinates,
			tags: eventData.tags || [],
		})
		.select()
		.single();

	if (eventError) throw eventError;

	// Link source to event
	if (sourceIds.length > 0) {
		const sourceLinks = sourceIds.map((sourceId) => ({
			eventId: event.id,
			sourceId: sourceId,
			relevance: "primary",
		}));

		const { error: linkError } = await supabase
			.from("source_links")
			.insert(sourceLinks);

		if (linkError) throw linkError;
	}

	if (actorLinks.length > 0) {
		const actorLinksData = actorLinks.map((link) => ({
			eventId: event.id,
			actorId: link.actorId,
			role: link.role,
		}));

		const { error: actorLinkError } = await supabase
			.from("actor_links")
			.insert(actorLinksData);

		if (actorLinkError) throw actorLinkError;
	}

	return event;
}

export async function updateEvent(
	eventId: string,
	eventData: any,
	sourceIds: string[] = [],
	actorLinks: { actorId: string; role: string }[] = []
) {
	const { data: event, error: eventError } = await supabase
		.from("events")
		.update({
			name: eventData.name,
			description: eventData.description,
			start_date: eventData.start_date || null,
			end_date: eventData.end_date || null,
			location: eventData.location,
			coordinates: eventData.coordinates,
			tags: eventData.tags || [],
		})
		.eq("id", eventId)
		.select()
		.single();

	if (eventError) throw eventError;

	// Remove existing source links
	await supabase.from("source_links").delete().eq("eventId", eventId);
	await supabase.from("actor_links").delete().eq("eventId", eventId);

	// Add new source links
	if (sourceIds.length > 0) {
		const sourceLinks = sourceIds.map((sourceId) => ({
			eventId: eventId,
			sourceId: sourceId,
			relevance: "primary",
		}));

		const { error: linkError } = await supabase
			.from("source_links")
			.insert(sourceLinks);

		if (linkError) throw linkError;
	}

	if (actorLinks.length > 0) {
		const actorLinksData = actorLinks.map((link) => ({
			eventId: eventId,
			actorId: link.actorId,
			role: link.role,
		}));

		const { error: actorLinkError } = await supabase
			.from("actor_links")
			.insert(actorLinksData);

		if (actorLinkError) throw actorLinkError;
	}

	return event;
}

export async function getEventsByLocation(locationName: string, year?: number) {
	let query = supabase
		.from("events")
		.select(
			`
        *,
        locationLinks:location_links (
          location:location (*)
        ),
        actorLinks:actor_links (
          role,
          actor:actor (*)
        )
      `
		)
		.or(
			`location.ilike.%${locationName}%,locationLinks.location.name.ilike.%${locationName}%`
		);

	if (year) {
		query = query
			.gte("start_date", `${year}-01-01`)
			.lte("start_date", `${year}-12-31`);
	}

	const { data, error } = await query.order("start_date", { ascending: true });

	if (error) throw error;
	return data;
}

export async function deleteEvent(eventId: string) {
	await supabase.from("source_links").delete().eq("eventId", eventId);
	await supabase.from("actor_links").delete().eq("eventId", eventId);
	await supabase.from("location_links").delete().eq("eventId", eventId);

	const { error } = await supabase.from("events").delete().eq("id", eventId);
	if (error) throw error;
}

export async function getEventsByDateRange(startYear: number, endYear: number) {
	const { data, error } = await supabase
		.from("events")
		.select(
			`
      *,
      locationLinks:location_links (
        location:location (*)
      ),
      actorLinks:actor_links (
        role,
        actor:actor (*)
      )
    `
		)
		.gte("start_date", `${startYear}-01-01`)
		.lte("start_date", `${endYear}-12-31`)
		.order("start_date", { ascending: true });

	if (error) throw error;
	return data;
}
