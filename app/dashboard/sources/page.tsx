"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SourcesRepository } from "@/components/dashboard/sources-repository";
import { MediaAssetsManagement } from "@/components/dashboard/media-assets-management";
import { FileText, ImageIcon } from "lucide-react";

export default function SourcesPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1
					className="text-3xl font-bold text-foreground"
					style={{ fontFamily: "var(--font-heading)" }}
				>
					Sources & Media
				</h1>
				<p className="text-muted-foreground mt-2">
					Manage historical documents, references, and media assets for your
					research.
				</p>
			</div>

			<Tabs defaultValue="sources" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2 max-w-md">
					<TabsTrigger value="sources" className="flex items-center gap-2">
						<FileText className="h-4 w-4" />
						Sources Repository
					</TabsTrigger>
					<TabsTrigger value="media" className="flex items-center gap-2">
						<ImageIcon className="h-4 w-4" />
						Media Gallery
					</TabsTrigger>
				</TabsList>

				<TabsContent value="sources" className="space-y-0">
					<SourcesRepository />
				</TabsContent>

				<TabsContent value="media" className="space-y-0">
					<MediaAssetsManagement />
				</TabsContent>
			</Tabs>
		</div>
	);
}
