<script lang="ts">
	let { data } = $props();
	import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<div class="container">
	<div class="mx-auto max-w-lg py-8 md:max-w-none">
		<RecipeCard recipe={data.recipe} />
	</div>
</div>
