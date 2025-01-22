<script lang="ts">
	import RecipePreview from '$lib/components/RecipePreview.svelte';

	let { data } = $props();
</script>

<div class="container">
	<div class="flex flex-row">Search bar goes here</div>
	<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
		{#await data.recipes}
			waiting for data..
		{:then recipes}
			{#each recipes as recipe}
				<RecipePreview props={recipe} />
			{/each}
		{/await}
	</div>
	<div class="flex flex-row">Pagination links go here</div>
</div>
