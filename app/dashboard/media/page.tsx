import { MediaAssetsManagement } from "@/components/dashboard/media-assets-management";

export default function MediaPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1
					className="text-3xl font-bold text-foreground"
					style={{ fontFamily: "var(--font-heading)" }}
				>
					Media Assets
				</h1>
				<p className="text-muted-foreground mt-2">
					Manage historical Media Assets
				</p>
			</div>

			<MediaAssetsManagement />
		</div>
	);
}
