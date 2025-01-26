<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from 'lucide-svelte';
	let { data } = $props();

	function goBack() {
		if (!browser) return;
		window.history.back();
	}
</script>

<div class="container">
	<div class="mx-auto max-w-lg py-8 md:max-w-none">
		<Button class="mb-4 rounded-full md:hidden" onclick={() => goBack()}
			><ArrowLeft class="h-4 w-4" /> Go Back</Button
		>
		<RecipeCard recipe={data.recipe} />
	</div>
</div>
