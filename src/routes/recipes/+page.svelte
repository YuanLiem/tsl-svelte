<script lang="ts">
	import RecipePreview from '$lib/components/RecipePreview.svelte';
	import { page } from '$app/state';

	let { data } = $props();
	let perPage = $state(12);
	let totalPages = $derived(Number(Math.ceil(data.recipeData.total / perPage)));
	let currentPage = $derived(Math.floor(Number(page.url.searchParams.get('skip') || 0) / perPage));
</script>

<div class="container">
	<div class="flex flex-row">Search bar goes here</div>
	<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
		{#each data.recipeData.recipes as recipe}
			<RecipePreview props={recipe} />
		{/each}
	</div>
	<div class="mx-auto flex max-w-lg flex-row justify-center gap-10 py-8">
		{#each { length: totalPages } as _, page}
			<a
				href={`/recipes?limit=${perPage}&skip=${perPage * page}`}
				class={currentPage === page ? 'text-emerald-300 hover:opacity-80' : 'hover:opacity-80'}
			>
				{page + 1}
			</a>
		{/each}
	</div>
</div>
