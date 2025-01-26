<script lang="ts">
	import type { PageProps } from './$types';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import RecipeSkeleton from '$lib/components/RecipeSkeleton.svelte';
	import { Button } from '$lib/components/ui/button';
	let { data }: PageProps = $props();

	let currentRecipe = $state(data.recipe);
	let isLoading = $state(false);

	async function fetchNewRecipe() {
		isLoading = true;
		try {
			const response = await fetch('/api/random-recipe');
			if (response.ok) {
				const recipe = await response.json();
				currentRecipe = recipe;
			} else {
				console.error('Failed to fetch new recipe');
			}
		} catch (error) {
			console.error('Error fetching new recipe:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="container py-8">
	<div class="container">
		<div class="mb-8 w-full text-center">
			<h1 class="mb-4 text-2xl font-bold">Let Math.random decide what's on the menu</h1>
			<Button disabled={isLoading} size="lg" onclick={fetchNewRecipe}>Randomize</Button>
		</div>
		{#await currentRecipe}
			<RecipeSkeleton />
		{:then recipe}
			<RecipeCard {recipe} />
		{:catch error}
			something went wrong.. try again {error.message}
		{/await}
	</div>
</div>
