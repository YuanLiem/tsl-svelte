import { type Icon } from 'lucide-svelte';

export type MenuItem = {
	label: string;
	slug: string;
};

export type SocialLink = {
	icon: typeof Icon;
	href: string;
};

export type SiteConfig = {
	companyName: string;
	tagLine: string;
	menuItems: MenuItem[];
	footerLegal: MenuItem[];
	socials: SocialLink[];
};
