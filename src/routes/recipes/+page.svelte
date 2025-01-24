<script lang="ts">
	import type { Recipe } from '$lib/types/types';
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/state';

	import RecipeModal from '$lib/components/RecipeModal.svelte';
	import RecipePage from './[id]/+page.svelte';

	let { data } = $props();

	let perPage = $state(12);
	let totalPages = $derived(Number(Math.ceil(data.recipeData.total / perPage)));

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

	const recipeBuffer: Array<Recipe & { searchTerms: string }> = data.allRecipes.recipes.map(
		(recipe: Recipe) => ({
			...recipe,
			searchTerms: `${recipe.name} ${recipe.tags.join(' ')} ${recipe.difficulty}`.toLowerCase()
		})
	);

	let searchText = $state<string | null>(null);

	let filteredRecipes = $derived.by(() => {
		let target = searchText?.toLowerCase();
		if (target) {
			return recipeBuffer.filter((r) => r.searchTerms.includes(target));
		} else {
			return recipeBuffer;
		}
	});

	let paginatedRecipes = $derived(
		filteredRecipes.slice(currentPage * perPage, (currentPage + 1) * perPage)
	);
</script>

<div class="container">
	<div class="flex justify-center py-8">
		<input
			placeholder="Filter recipes.."
			class="rounded-lg border-2 border-primary p-2"
			type="text"
			bind:value={searchText}
		/>
	</div>
	<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each paginatedRecipes as recipe}
			<a href={`/recipes/${recipe.id}`} onclick={openModal}>
				<RecipePreview props={recipe} />
			</a>
		{/each}
	</div>
	<div class="mx-auto flex max-w-lg flex-row justify-center gap-10 py-8">
		<button
			onclick={() => currentPage--}
			disabled={currentPage === 0}
			class="disabled:cursor-not-allowed disabled:opacity-20"><ChevronLeft /></button
		>
		{#each { length: totalPages } as _, page}
			<button
				onclick={() => (currentPage = page)}
				class={currentPage === page ? 'text-emerald-300 hover:opacity-80' : 'hover:opacity-80'}
			>
				{page + 1}
			</button>
		{/each}
		<button
			onclick={() => currentPage++}
			disabled={currentPage + 1 >= totalPages}
			class="disabled:cursor-not-allowed disabled:opacity-20"><ChevronRight /></button
		>
	</div>
</div>
{#if page.state.selected}
	<RecipeModal onclose={() => history.back()}>
		<RecipePage data={page.state.selected} />
	</RecipeModal>
{/if}
