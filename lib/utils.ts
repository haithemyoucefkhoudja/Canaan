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
