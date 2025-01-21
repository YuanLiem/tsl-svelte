<script lang="ts">
	import type { Recipe } from '$lib/types/types';

	let { recipe }: { recipe: Recipe } = $props();
	type Feature = {
		label: string;
	};
</script>

{#snippet feature({ ...props }: Feature)}
	<div class="w-fit rounded-full border">
		{props.label}
	</div>
{/snippet}

<div class="flex flex-col overflow-hidden rounded-xl border shadow-md md:flex-row">
	<figure class="overflow-hidden md:w-1/2">
		<img src={recipe.image} class="h-full" alt={recipe.name} />
	</figure>
	<div class="flex-flex-col gap-4 p-4 md:w-1/2">
		<h3 class="text-xl">{recipe.name}</h3>
		<div class="flex flex-row items-center justify-between">
			<p class="text-muted-foreground">{recipe.cuisine}</p>
			{recipe.rating}
		</div>
	</div>
</div>
