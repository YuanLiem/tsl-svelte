<script lang="ts">
	import type { Recipe } from '$lib/types/types';
	import { getRecipeFilters } from '$lib/utils';
	type Props = {
		search: string | null;
		tags: string | null;
		cuisine: string | null;
		perpage: number;
		filteredRecipes: Array<Recipe & { keywords: string }>;
	};

	let {
		search = $bindable(),
		tags = $bindable(),
		cuisine = $bindable(),
		perpage = $bindable(),
		filteredRecipes
	}: Props = $props();
</script>

<div class="flex flex-col flex-wrap content-center justify-center gap-10 py-8 md:flex-row">
	<input
		placeholder="Filter recipes.."
		class="rounded-lg border-2 p-2 focus:border-primary"
		type="text"
		bind:value={search}
	/>
	<label for="tag" class="content-center">
		<span class="mr-2">Select a tag </span>
		<select
			class="rounded-lg border-2 p-2 focus:border-primary"
			bind:value={tags}
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
		<span class="mr-2"> Select a cuisine</span>
		<select
			class="rounded-lg border-2 p-2 focus:border-primary"
			name="cuisine"
			bind:value={cuisine}
		>
			<option value={null} selected>All cuisines</option>
			{#each getRecipeFilters(filteredRecipes).cuisineSet as item}
				<option value={item}>{item}</option>
			{/each}
		</select>
	</label>
	<label for="pagecount" class="content-center">
		<span class="mr-2">Per page</span>
		<select
			class="rounded-lg border-2 p-2 focus:border-primary"
			name="pagecount"
			id="pagecount"
			bind:value={perpage}
		>
			<option value={8}>8</option>
			<option value={12} selected>12</option>
			<option value={16}>16</option>
		</select>
	</label>
</div>
