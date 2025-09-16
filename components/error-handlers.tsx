import Link from "next/link";

// Wrapper is primarily for layout, so it remains unchanged.
const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="min-h-[100dvh-10rem] mx-auto relative py-20 px-4 flex items-center justify-center">
		{children}
	</div>
);

export const Error = ({ message }: { message: string }) => (
	<Wrapper>
		<div className="text-center max-w-md mx-auto">
			<div className="mb-8">
				{/* Removed text size, font weight, and color */}
				<h1 className="mb-4">500</h1>
				{/* Removed text size, font weight, and color */}
				<h2 className="mb-2">
					Error Found.{" "}
					{/* Removed underline class */}
					<Link href="/">
						Go Back Home
					</Link>
				</h2>
				{/* Removed color, text size, and leading */}
				<p>
					Error: {message}
				</p>
			</div>
		</div>
	</Wrapper>
);
export const NotFound = () => (
	<Wrapper>
		<div className="text-center max-w-md mx-auto">
			<div className="mb-8">
				{/* Removed text size, font weight, and color */}
				<h1 className="mb-4">404</h1>
				{/* Removed text size, font weight, and color */}
				<h2 className="mb-2">
					Items Not Found.{" "}
					{/* Removed underline class */}
					<Link href="/">
						Go Back Home
					</Link>
				</h2>
				{/* Removed color, text size, and leading */}
				<p>
					Sorry, we couldn&apos;t find the items you&apos;re looking for. The
					items might have been moved, deleted, or you entered the wrong URL.
				</p>
			</div>
		</div>
	</Wrapper>
);