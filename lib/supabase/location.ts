import { supabase } from "./supabase";

export async function getLocations() {
	const { data, error } = await supabase
		.from("location")
		.select()
		.order("name");

	if (error) throw error;
	return data;
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
