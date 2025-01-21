<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import { page } from '$app/state';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { MenuItem } from '$lib/types/types';

	import { cn } from '$lib/utils';

	//type MenuItem = {
	//	label: string;
	//	slug: string;
	//};
</script>

{#snippet menuItem({ ...props }: MenuItem)}
	<a
		href={props.slug}
		class={cn(
			page.url.pathname === props.slug && 'bg-teal-500 text-white',
			'rounded-md px-4 py-2 hover:opacity-80'
		)}
	>
		<li>
			{props.label}
		</li>
	</a>
{/snippet}

<header class="sticky top-0 flex justify-between bg-primary-foreground p-4 shadow-md">
	<nav class="flex flex-row items-center gap-4">
		<div class="mr-8">
			{siteConfig.companyName}
		</div>
		<ul class="hidden max-w-sm bg-red-500 md:contents">
			{#each siteConfig.menuItems as item}
				{@render menuItem(item)}
			{/each}
		</ul>
	</nav>
	<ThemeButton />
</header>
