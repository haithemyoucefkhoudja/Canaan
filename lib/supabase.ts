import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export async function getSources() {
  const { data, error } = await supabase
    .from("source")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMediaAssets() {
  const { data, error } = await supabase
    .from("media_assets")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getActors() {
  const { data, error } = await supabase.from("actor").select().order("name");

  if (error) throw error;
  return data;
}

export async function getLocations() {
  const { data, error } = await supabase
    .from("location")
    .select()
    .order("name");

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

export async function createSource(source: any) {
  const { data, error } = await supabase
    .from("source")
    .insert(source)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSource(sourceId: string, sourceData: any) {
  const { data, error } = await supabase
    .from("source")
    .update(sourceData)
    .eq("id", sourceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSource(sourceId: string) {
  await supabase.from("source_links").delete().eq("sourceId", sourceId);

  const { error } = await supabase.from("source").delete().eq("id", sourceId);
  if (error) throw error;
}

export async function createLocation(locationData: any) {
  const { data, error } = await supabase
    .from("location")
    .insert({
      name: locationData.name,
      description: locationData.description,
      coordinates: locationData.coordinates,
      location_type: locationData.location_type,
      parent_location: locationData.parent_location || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLocation(locationId: string, locationData: any) {
  const { data, error } = await supabase
    .from("location")
    .update({
      name: locationData.name,
      description: locationData.description,
      coordinates: locationData.coordinates,
      location_type: locationData.location_type,
      parent_location: locationData.parent_location || null,
    })
    .eq("id", locationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLocation(locationId: string) {
  await supabase.from("location_links").delete().eq("locationId", locationId);

  const { error } = await supabase
    .from("location")
    .delete()
    .eq("id", locationId);
  if (error) throw error;
}

export async function deleteActor(actorId: string) {
  await supabase.from("actor_links").delete().eq("actorId", actorId);

  const { error } = await supabase.from("actor").delete().eq("id", actorId);
  if (error) throw error;
}

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

export async function getDashboardStats() {
  const [eventsCount, sourcesCount, mediaCount, actorsCount, locationsCount] =
    await Promise.all([
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("source").select("id", { count: "exact", head: true }),
      supabase
        .from("media_assets")
        .select("id", { count: "exact", head: true }),
      supabase.from("actor").select("id", { count: "exact", head: true }),
      supabase.from("location").select("id", { count: "exact", head: true }),
    ]);

  return {
    events: eventsCount.count || 0,
    source: sourcesCount.count || 0,
    media: mediaCount.count || 0,
    actor: actorsCount.count || 0,
    location: locationsCount.count || 0,
  };
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

/**
 * The expected shape of the API response for better type safety.
 */
export interface EmbedApiResponse {
  message: string;
  sourceId: string;
  chunksCreated: number;
}

/**
 * Triggers the embedding process by calling the backend API endpoint.
 * This function is designed to be called from client-side components.
 *
 * @param sourceId The UUID of the parent source.
 * @param content The full text content to be chunked and embedded.
 * @param metadata A JSON object with additional details about the source.
 * @returns A promise that resolves with the API response on success.
 * @throws An error with a user-friendly message if the API call fails.
 */
export async function createDocumentEmbedding(
  sourceId: string,
  content: string,
  metadata: Record<string, any>
): Promise<EmbedApiResponse> {
  // 1. Construct the request body from the function arguments
  const requestBody = {
    sourceId,
    content,
    metadata,
  };

  // 2. Call the API endpoint using fetch
  const response = await fetch("/api/embedding", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // 3. Handle the response
  const data = await response.json();

  if (!response.ok) {
    // If the server returns an error (e.g., status 400 or 500),
    // throw an error to be caught by the calling component.
    // The `data.error` field will contain the specific message from our API handler.
    throw new Error(
      data.error || "Failed to create embeddings. Please try again."
    );
  }

  // 4. Return the successful response data
  return data as EmbedApiResponse;
}

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
