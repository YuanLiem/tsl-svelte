<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { getGroceryList } from '$lib/stores/grocery-list.svelte';
	let { data } = $props();

	const groceries = getGroceryList();
	console.log(groceries);
</script>

<div class="container">
	<div class="mx-auto max-w-lg py-8 md:max-w-none">
		<RecipeCard recipe={data.recipe} />
	</div>
</div>
