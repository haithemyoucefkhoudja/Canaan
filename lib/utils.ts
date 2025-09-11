import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLOR_MAP } from "@/constants";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function formUrlQuery({
	params,
	key,
	value,
}: {
	params: string;
	key: string;
	value: string | null;
}) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}
export function createUrl(pathname: string, params: URLSearchParams | string) {
	const paramsString = params?.toString();
	const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

	return `${pathname}${queryString}`;
}

export function getColorHex(colorName: string): string | [string, string] {
	const lowerColorName = colorName.toLowerCase();

	// Check for exact match first
	if (COLOR_MAP[lowerColorName]) {
		return COLOR_MAP[lowerColorName];
	}

	// Check for partial matches (for cases where color name might have extra text)
	for (const [key, value] of Object.entries(COLOR_MAP)) {
		if (lowerColorName.includes(key) || key.includes(lowerColorName)) {
			return value;
		}
	}

	// Return a default color if no match found
	return "#666666";
}

export const getLabelPosition = (
	index: number
): "top-left" | "top-right" | "bottom-left" | "bottom-right" => {
	const positions = [
		"top-left",
		"bottom-right",
		"top-right",
		"bottom-left",
	] as const;
	return positions[index % positions.length];
};
export const formatSize = (size: number) => {
	if (size < 1024 * 1024) {
		return `${(size / 1024).toFixed(2)} KB`;
	} else {
		return `${(size / (1024 * 1024)).toFixed(2)} MB`;
	}
};
export function formatId(id: string) {
	return `..${id.substring(id.length - 6)}`;
}
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Fetches an image from a URL and converts it to a Base64 encoded string.
 *
 * @param {string} url The URL of the image to encode.
 * @returns {Promise<string>} A promise that resolves with the Base64 encoded data URL.
 * @throws {Error} If the fetch request fails or the response is not ok.
 */
export async function imageUrlToBase64(url: string): Promise<string> {
	try {
		// 1. Fetch the image
		const response = await fetch(url);

		// 2. Check if the request was successful
		if (!response.ok) {
			throw new Error(
				`Failed to fetch image: ${response.status} ${response.statusText}`
			);
		}

		// 3. Get the image data as a Blob
		const blob = await response.blob();

		// 4. Use FileReader to convert Blob to a a Base64 string (Data URL)
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			// The 'loadend' event is fired when a read has completed, successfully or not.
			reader.onloadend = () => {
				// The result attribute contains the data as a URL representing the file's data as a base64 encoded string.
				resolve(reader.result as string);
			};

			// The 'error' event is fired when the reading failed.
			reader.onerror = (error) => {
				reject(error);
			};

			// Start reading the Blob as a Data URL
			reader.readAsDataURL(blob);
		});
	} catch (error) {
		console.error("Error converting URL to Base64:", error);
		// Re-throw the error or handle it as needed
		throw error;
	}
}
