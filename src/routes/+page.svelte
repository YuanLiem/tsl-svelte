<script lang="ts">
	import type { PageProps } from './$types';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import RecipeSkeleton from '$lib/components/RecipeSkeleton.svelte';
	let { data }: PageProps = $props();
</script>

<div class="container py-8">
	<h1 class="mb-8 text-2xl font-bold">Let Math.random decide what's on the menu</h1>
	{#await data.recipe}
		<RecipeSkeleton />
	{:then recipe}
		<RecipeCard {recipe} />
	{/await}
</div>
