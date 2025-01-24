<script lang="ts">
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/state';

	import RecipeModal from '$lib/components/RecipeModal.svelte';
	import RecipePage from './[id]/+page.svelte';

	let { data } = $props();

	let perPage = $state(12);
	let totalPages = $derived(Number(Math.ceil(data.recipeData.total / perPage)));
	let currentPage = $derived(Math.floor(Number(page.url.searchParams.get('skip') || 0) / perPage));

	async function openModal(e: MouseEvent) {
		if (innerWidth < 640 || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
		e.preventDefault();
		const { href } = e.currentTarget as HTMLAnchorElement;

		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { selected: result.data });
		} else {
			goto(href);
		}
	}
</script>

<div class="container">
	<div class="flex">Search bar goes here</div>
	<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
		{#each data.recipeData.recipes as recipe}
			<a href={`/recipes/${recipe.id}`} onclick={openModal}>
				<RecipePreview props={recipe} />
			</a>
		{/each}
	</div>
	<div class="mx-auto flex max-w-lg flex-row justify-center gap-10 py-8">
		{#if currentPage > 0 && currentPage < totalPages}
			<a href={`/recipes?limit=${perPage}&skip=${perPage * (currentPage - 1)}`}><ChevronLeft /></a>
		{/if}
		{#each { length: totalPages } as _, page}
			<a
				href={`/recipes?limit=${perPage}&skip=${perPage * page}`}
				class={currentPage === page ? 'text-emerald-300 hover:opacity-80' : 'hover:opacity-80'}
			>
				{page + 1}
			</a>
		{/each}
		{#if currentPage + 1 < totalPages}
			<a href={`/recipes?limit=${perPage}&skip=${perPage * (currentPage + 1)}`}><ChevronRight /></a>
		{/if}
	</div>
</div>
{#if page.state.selected}
	<RecipeModal onclose={() => history.back()}>
		<RecipePage data={page.state.selected} />
	</RecipeModal>
{/if}
