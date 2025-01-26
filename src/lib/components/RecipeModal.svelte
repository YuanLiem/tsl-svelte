<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children }: { children: Snippet } = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
	}
</script>

<div
	role="button"
	tabindex="0"
	aria-label="Close modal"
	onkeydown={handleKeyDown}
	onclick={() => history.back()}
	class="fixed left-0 top-0 z-20 h-full w-full content-center bg-primary-foreground/70 py-16"
>
	<div
		in:fade={{ duration: 700 }}
		out:fade={{ duration: 300 }}
		onclick={(e: MouseEvent) => e.stopPropagation()}
		class="mx-auto max-w-[80%] cursor-default"
	>
		{@render children()}
	</div>
</div>
