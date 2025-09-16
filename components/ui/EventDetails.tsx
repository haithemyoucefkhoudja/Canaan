import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { RichTextReader } from "../text-editor/rich-text-reader";
import { EventWLinks } from "@/types/events";

interface EventDetailsProps {
	event: EventWLinks | null;
}

export default function EventDetails({ event }: EventDetailsProps) {
	return (
		// 'sticky top-24' ensures it stays in view while scrolling the timeline
		<div className="sticky top-24">
			{/* 
        NEW: We make the card a flex column with a max height.
        This allows the content area to grow and become scrollable.
      */}
			<Card className="bg-slate-950 border border-slate-800 flex flex-col max-h-[80vh]">
				<CardHeader>
					{event ? (
						<>
							<CardTitle className="text-2xl text-green-400">
								{event.name}
							</CardTitle>
							<CardDescription className="text-slate-400">
								{new Date(event.start_date).toLocaleDateString()}
							</CardDescription>
						</>
					) : (
						<CardTitle className="text-slate-500">Select an Event</CardTitle>
					)}
				</CardHeader>

				{/* 
          NEW: 'overflow-y-auto' adds a vertical scrollbar ONLY if the content is too long.
        */}
				<CardContent className="overflow-y-auto">
					{event ? (
						<RichTextReader content={event.description} />
					) : (
						<p className="text-center text-slate-600 pt-10">
							Click "Read more" on an event to see its full details here.
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
