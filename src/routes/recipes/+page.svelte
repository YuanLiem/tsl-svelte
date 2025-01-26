<script lang="ts">
	import type { Recipe } from '$lib/types/types';
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/state';
	// TODO: Break into separate RecipeFilter component

	import RecipeModal from '$lib/components/RecipeModal.svelte';
	import RecipePage from './[id]/+page.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	let { data } = $props();

	let perPage = $state(12);

	let currentPage = $state(0);

	async function openModal(e: MouseEvent) {
		if (innerWidth < 768 || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
		e.preventDefault();
		const { href } = e.currentTarget as HTMLAnchorElement;

		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { selected: result.data });
		} else {
			goto(href);
		}
	}

	const recipeBuffer: Array<Recipe & { keywords: string }> = data.allRecipes.recipes.map(
		(recipe: Recipe) => ({
			...recipe,
			keywords: `${recipe.name} ${recipe.tags.join(' ')} ${recipe.difficulty}`.toLowerCase()
		})
	);

	let searchText = $state<string | null>(null);

	let selectedTag = $state<string | null>(null);

	let selectedCuisine = $state<string | null>(null);

	let filteredRecipes = $derived.by(() => {
		let keyword = searchText?.toLowerCase();
		let tag = selectedTag?.toLowerCase();
		let cuisine = selectedCuisine?.toLowerCase();

		return recipeBuffer.filter((r) => {
			const matchesSearch = keyword ? r.keywords.includes(keyword) : true;
			const matchesTag = tag ? r.tags.some((t) => t.toLowerCase() === tag) : true;
			const matchesCuisine = cuisine ? r.cuisine.toLowerCase().includes(cuisine) : true;

			return matchesSearch && matchesTag && matchesCuisine;
		});
	});

	let totalPages = $derived(Number(Math.ceil(filteredRecipes.length / perPage)));

	let paginatedRecipes = $derived(
		filteredRecipes.slice(currentPage * perPage, (currentPage + 1) * perPage)
	);

	function getRecipeFilters(input: Array<Recipe & { keywords: string }>) {
		let tagSet = new Set();
		let cuisineSet = new Set();
		input.forEach((recipe) => {
			cuisineSet.add(recipe.cuisine);
			recipe.tags.forEach((tag) => {
				tagSet.add(tag);
			});
		});
		return { tagSet, cuisineSet };
	}
</script>

<div class="container">
	<div class="flex flex-col flex-wrap content-center justify-center gap-10 py-8 md:flex-row">
		<input
			placeholder="Filter recipes.."
			class="rounded-lg border-2 p-2 focus:border-primary"
			type="text"
			bind:value={searchText}
		/>
		<label for="tag" class="content-center">
			<span class="mr-2">Select a tag </span>
			<select
				class="rounded-lg border-2 p-2 focus:border-primary"
				bind:value={selectedTag}
				name="tag"
				id="tag"
			>
				<option value={null} selected>All tags</option>
				{#each getRecipeFilters(filteredRecipes).tagSet as item}
					<option value={item}>{item}</option>
				{/each}
			</select>
		</label>
		<label for="cuisine" class="content-center">
			<span class="mr-2"> Select a cuisine </span>
			<select
				class="rounded-lg border-2 p-2 focus:border-primary"
				name="cuisine"
				bind:value={selectedCuisine}
			>
				<option value={null} selected>All cuisines</option>
				{#each getRecipeFilters(filteredRecipes).cuisineSet as item}
					<option value={item}>{item}</option>
				{/each}
			</select>
		</label>
	</div>
	<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#if paginatedRecipes.length > 0}
			{#each paginatedRecipes as recipe}
				<a href={`/recipes/${recipe.id}`} onclick={openModal}>
					<RecipePreview props={recipe} />
				</a>
			{/each}
		{:else}
			<p
				class="text-center text-2xl text-muted-foreground sm:col-span-2 md:col-span-3 lg:col-span-4"
			>
				No matching recipes found..
			</p>
		{/if}
	</div>
	<Pagination
		increment={() => currentPage++}
		decrement={() => currentPage--}
		update={(num: number) => (currentPage = num)}
		{currentPage}
		{totalPages}
	/>
</div>
{#if page.state.selected}
	<RecipeModal onclose={() => history.back()}>
		<RecipePage data={page.state.selected} />
	</RecipeModal>
{/if}
