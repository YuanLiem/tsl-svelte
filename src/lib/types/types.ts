import { type Icon } from 'lucide-svelte';

export type Recipe = {
	id: number;
	name: string;
	ingredients: string[];
	instructions: string[];
	prepTimeMinutes: number;
	cookTimeMinutes: number;
	servings: number;
	difficulty: string;
	cuisine: string;
	tags: string[];
	userId: number;
	image: string;
	rating: number;
	reviewCount: number;
	mealType: string[];
};

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
