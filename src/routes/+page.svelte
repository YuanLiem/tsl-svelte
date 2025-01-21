<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1 class="text-2xl">Let Math.random decide what's on the menu</h1>
{#await data.recipe}
	.. loading recipe
{:then recipe}
	<div>
		<h3 class="text-xl">{recipe.name}</h3>
		<img src={recipe.image} width="200" alt={recipe.name} />
		<p class="text-muted-foreground">{recipe.cuisine}</p>
	</div>
{/await}
