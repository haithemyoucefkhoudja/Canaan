import { NavItem } from "./types/nav-item";

export const CONTACT_LINKS: NavItem[] = [
	{
		label: "37°47'33.4\"N 122°24'18.6\"W",
		href: "https://maps.app.goo.gl/MnpbPDEHxoDydc9M9",
	},
	{
		label: "(269) 682-1402",
		href: "https://joyco.studio/showcase",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/joyco.studio/",
	},
];

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";

export const isDevelopment = process.env.NODE_ENV === "development";
