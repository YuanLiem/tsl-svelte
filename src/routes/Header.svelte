<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import { page } from '$app/state';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import type { MenuItem } from '$lib/types/types';

	import { cn } from '$lib/utils';
	import { Menu, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	let isOpen = $state(false);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		isOpen = !isOpen;
	}
</script>

{#snippet menuItem({ ...props }: MenuItem)}
	<a
		href={props.slug}
		class={cn(
			page.url.pathname === props.slug && 'flex w-fit bg-teal-500 text-white',
			'rounded-md px-4 py-2 hover:opacity-80'
		)}
	>
		<li>
			{props.label}
		</li>
	</a>
{/snippet}

{#snippet mobileItem({ ...props }: MenuItem)}
	<a
		href={props.slug}
		class={cn(
			page.url.pathname === props.slug && 'bg-teal-500 text-white',
			'flex w-full rounded-md px-4 py-2 hover:opacity-80'
		)}
		onclick={() => (isOpen = !isOpen)}
	>
		<li>
			{props.label}
		</li>
	</a>
{/snippet}

<header
	class="sticky top-0 z-30 flex items-center justify-between bg-primary-foreground p-4 shadow-md"
>
	<div class="font-bold">
		{siteConfig.companyName}
	</div>
	<nav class="flex flex-row items-center gap-4">
		<ul class="hidden max-w-sm md:contents">
			{#each siteConfig.menuItems as item}
				{@render menuItem(item)}
			{/each}
		</ul>
	</nav>
	<Button size="icon" variant="outline" class="flex md:hidden" onclick={() => (isOpen = !isOpen)}>
		{#if isOpen}
			<X />
		{:else}
			<Menu />
		{/if}
	</Button>
	<ThemeButton class="hidden md:flex" />
</header>
{#if isOpen}
	<nav class="fixed top-16 z-20 flex h-full w-full flex-col bg-primary-foreground/60">
		<ul class="flex flex-col gap-2 bg-primary-foreground px-4 py-8">
			{#each siteConfig.menuItems as item}
				{@render mobileItem(item)}
			{/each}
			<li class="flex flex-row justify-end">
				<ThemeButton />
			</li>
		</ul>
		<div
			role="button"
			tabindex="0"
			aria-label="Close menu"
			onkeydown={handleKeyDown}
			class="flex-grow"
			onclick={() => (isOpen = !isOpen)}
		></div>
	</nav>
{/if}
