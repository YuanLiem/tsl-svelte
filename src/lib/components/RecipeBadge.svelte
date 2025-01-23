<script lang="ts">
	import type { RecipeFeature } from '$lib/types/types';
	let { features }: { features: RecipeFeature } = $props();
	// TODO: Hover should show label (on Desktop)
	// TODO: Label should show on mobile
</script>

<div class="inline-flex w-fit rounded-full border bg-muted px-2 py-0.5 text-sm">
	{#if features.icon}
		<features.icon class="mr-2 h-4 w-4" />
	{/if}
	<span class="text-xs">
		{features.value}
	</span>
</div>
