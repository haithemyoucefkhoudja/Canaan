import { LocationLink, Event, SourceLink, ActorLink } from "@prisma/client";

export type EventWLinks = Omit<Event, "start_date" | "end_date"> & {
	start_date: string;
	end_date: string;
} & {
	locationLinks: LocationLink[];
	sourceLinks: SourceLink[];
	actorLinks: ActorLink[];
};
