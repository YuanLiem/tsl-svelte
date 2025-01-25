import { Instagram, Facebook } from 'lucide-svelte';
import type { SiteConfig } from '$lib/types/types';

export const siteConfig: SiteConfig = {
	companyName: 'App Name',
	tagLine: 'Catchphrase that converts',
	menuItems: [
		{
			label: 'Home',
			slug: '/'
		},
		{
			label: 'Recipes',
			slug: '/recipes'
		},
		{
			label: 'Grocery List',
			slug: '/grocery-list'
		}
	],
	footerLegal: [
		{
			label: 'F.A.Q',
			slug: '/faq'
		},
		{
			label: 'Privacy Policy',
			slug: '/privacy-policy'
		},
		{
			label: 'Terms & Conditions',
			slug: '/terms-conditions'
		}
	],
	socials: [
		{
			icon: Instagram,
			href: 'https://www.instagram.com'
		},
		{
			icon: Facebook,
			href: 'https://www.facebook.com'
		}
	]
};
