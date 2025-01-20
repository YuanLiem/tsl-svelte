<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { siteConfig } from '$lib/config/site';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	<header class="sticky top-0 bg-primary-foreground p-4 shadow-md">Nav goes here</header>
	<main>
		{@render children()}
	</main>
	<footer class="container py-8">
		<div class="mb-2">
			<h3 class="text-xl">{siteConfig.companyName}</h3>
			<p class="text-muted-foreground">{siteConfig.tagLine}</p>
		</div>
		<div class="flex flex-col md:flex-row">
			<div class="flex w-full flex-col md:w-1/2">footer nav goes here</div>
			<div class="flex w-full flex-col md:w-1/2">legal info</div>
		</div>
	</footer>
</div>
