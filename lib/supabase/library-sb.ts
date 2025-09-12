import { supabase } from './supabase';

// === Event Functions ===
export const getEvents = async () => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getEvent = async (eventId: string) => {
  const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single();
  if (error) throw new Error(error.message);
  return data;
};

// === Actor Functions ===
export const getActors = async () => {
  const { data, error } = await supabase.from('actors').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getActor = async (actorId: string) => {
  const { data, error } = await supabase.from('actors').select('*').eq('id', actorId).single();
  if (error) throw new Error(error.message);
  return data;
};

// === Location Functions ===
export const getLocations = async () => {
    const { data, error } = await supabase.from('locations').select('*');
    if (error) throw new Error(error.message);
    return data;
};

export const getLocation = async (locationId: string) => {
    const { data, error } = await supabase.from('locations').select('*').eq('id', locationId).single();
    if (error) throw new Error(error.message);
    return data;
};

// === Functions for a Specific Event ===
export const getMediaForEvent = async (eventId: string) => {
  const { data, error } = await supabase.from('media').select('*').eq('eventId', eventId);
  if (error) throw new Error(error.message);
  return data;
};

export const getSourcesForEvent = async (eventId: string) => {
  const { data, error } = await supabase.from('sources').select('*').eq('eventId', eventId);
  if (error) throw new Error(error.message);
  return data;
};

export const getActorsForEvent = async (eventId: string) => {
    const { data, error } = await supabase
      .from('event_actors')
      .select('actors(*)')
      .eq('event_id', eventId);
    if (error) throw new Error(error.message);
    return data?.map(item => item.actors) || [];
};