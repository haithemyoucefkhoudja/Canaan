
"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEvent } from "@/hooks/useEvents";
import { useMedia } from "@/hooks/useMedia";
import { useSources } from "@/hooks/useSources";
import { useLocation } from "@/hooks/useLocations";
import EventCard from "@/components/library/EventCard";
import MediaGallery from "@/components/library/MediaGallery";
import SourceList from "@/components/library/SourceList";
import { Skeleton } from "@/components/library/Skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

const MapComponent = dynamic( () => import("@/components/library/MapComponent"), { ssr: false, loading: () => <Skeleton className="h-96 w-full" /> } );

// UPDATED: New placeholder text for the featured event
const placeholderEvent = {
	id: "1",
	name: "Featured Event",
	description: "This is a featured event from the collection. The button below leads to the full interactive timeline where you can explore all historical events.",
	startDate: new Date().toISOString(),
	endDate: null,
	tags: ["history", "introduction"],
	locationId: "1",
	actorIds: [],
};

const placeholderLocation = { id: "default-location", name: "Historic Jerusalem", description: "A city of immense historical and cultural significance.", latitude: 31.7683, longitude: 35.2137, };

export default function HomePage() {
	const eventId = "1";
	const { data: event, isLoading: isEventLoading, isError: isEventError, } = useEvent(eventId);
	const { data: media, isLoading: isMediaLoading } = useMedia(eventId);
	const { data: sources, isLoading: isSourcesLoading } = useSources(eventId);
	const { data: location, isLoading: isLocationLoading } = useLocation( event?.locationId ?? null );

	const displayEvent = event || placeholderEvent;
	const displayLocation = location || placeholderLocation;

	if (isEventLoading) {
		return ( <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div className="space-y-8"> <Skeleton className="h-64 w-full" /> <Skeleton className="h-96 w-full" /> <Skeleton className="h-80 w-full" /> </div> </div> );
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{isEventError && (
				<Card className="mb-8 border-yellow-500 bg-yellow-50/50">
					<CardContent className="pt-6"> <p className="text-center text-yellow-700"> Could not load data from the database. Displaying placeholder structure. </p> </CardContent>
				</Card>
			)}

			<section className="mb-12"> <EventCard event={displayEvent} /> </section>

			<section className="mb-12">
				<h2 className="text-3xl font-bold tracking-tight mb-6"> Media Gallery </h2>
				{isMediaLoading ? ( <Skeleton className="h-48 w-full" /> ) : ( <MediaGallery media={media || []} /> )}
			</section>

			<section className="mb-12">
				<h2 className="text-3xl font-bold tracking-tight mb-6"> Historical Sources </h2>
				{isSourcesLoading ? ( <Skeleton className="h-48 w-full" /> ) : ( <SourceList sources={sources || []} /> )}

        		{/* UPDATED: Links now point to /library/* and hover effects are added */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
					<Link href="/library/actors" passHref>
						<Card className="hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-transform duration-300">
							<CardHeader className="flex flex-row items-center gap-4">
								<Users className="h-8 w-8 text-primary" />
								<div>
									<CardTitle>Actors</CardTitle>
									<CardDescription>Discover the key figures.</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</Link>
					<Link href="/library/locations" passHref>
						<Card className="hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-transform duration-300">
							<CardHeader className="flex flex-row items-center gap-4">
								<MapPin className="h-8 w-8 text-primary" />
								<div>
									<CardTitle>Locations</CardTitle>
									<CardDescription>See the historical geography.</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</Link>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="text-3xl font-bold tracking-tight mb-6"> Location on Map </h2>
				{isLocationLoading ? ( <Skeleton className="h-96 w-full" /> ) : ( <MapComponent location={displayLocation} event={displayEvent} /> )}
			</section>
		</div>
	);
}