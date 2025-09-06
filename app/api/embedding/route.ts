// app/api/sources/embed/route.ts

import { NextResponse } from "next/server";
import { createEmbeddingsWithLangChain } from "@/lib/tools/embed-document"; // Adjust path to your embedding function
import { createClient } from "@/lib/supabase-server-client";
import { cookies } from "next/headers";

// Define the expected shape of the request body to match your function
interface EmbedRequest {
	sourceId: string;
	content: string;
	metadata: Record<string, any>;
}

/**
 * API Route to handle the embedding process.
 * Accepts a POST request with `sourceId`, `content`, and `metadata`.
 */
export async function POST(request: Request) {
	try {
		const supabase = createClient(cookies());

		// 1. Parse and Validate the Request Body
		const body: EmbedRequest = await request.json();
		const { sourceId, content, metadata } = body;

		// Validate that all required fields are present and have the correct type
		if (!sourceId || typeof sourceId !== "string") {
			return NextResponse.json(
				{ error: 'Invalid or missing "sourceId".' },
				{ status: 400 }
			);
		}
		if (!content || typeof content !== "string") {
			return NextResponse.json(
				{ error: 'Invalid or missing "content".' },
				{ status: 400 }
			);
		}
		if (!metadata || typeof metadata !== "object") {
			return NextResponse.json(
				{ error: 'Invalid or missing "metadata".' },
				{ status: 400 }
			);
		}

		// 2. Trigger the Embedding Process with the provided data
		const chunksCreated = await createEmbeddingsWithLangChain(
			supabase,
			sourceId,
			content,
			metadata
		);

		// 3. Update the original source's `isEmbedded` flag on success
		// This is the only interaction with the `sources` table.
		const { error } = await supabase
			.from("source")
			.update({ is_embedded: true }) // 1. The data to update goes here
			.eq("id", sourceId); // 2. The filter (WHERE id = sourceId) is chained here

		if (error) {
			console.error("Failed to update source:", error);
			return NextResponse.json(
				{ error: "Failed to update source." },
				{ status: 500 }
			);
		}

		// 4. Return a Success Response
		return NextResponse.json(
			{
				message: "Embeddings created and stored successfully.",
				sourceId: sourceId,
				// chunksCreated: chunksCreated,
			},
			{ status: 200 } // OK
		);
	} catch (error: any) {
		// 5. Handle Errors Gracefully
		console.error("Embedding process failed:", error);

		// No need to update status to FAILED, as the field doesn't exist.
		// We just log the error and return a generic server error message.
		return NextResponse.json(
			{
				error:
					"An internal server error occurred during the embedding process.",
			},
			{ status: 500 } // Internal Server Error
		);
	}
}
