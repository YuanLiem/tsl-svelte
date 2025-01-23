<script lang="ts">
	let { data } = $props();
	import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<div class="container">
	<RecipeCard recipe={data.recipe} />
</div>
