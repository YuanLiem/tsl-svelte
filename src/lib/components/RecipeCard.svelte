<script lang="ts">
	import type { Recipe } from '$lib/types/types';
	import { ChartColumnIncreasing, Clock4, Clock8, HandPlatter, Icon } from 'lucide-svelte';
	import RecipeRating from './RecipeRating.svelte';

	let { recipe }: { recipe: Recipe } = $props();

	type Detail = {
		label?: string;
		value?: string;
		icon?: typeof Icon;
	};

	const info: Detail[] = [
		{
			label: 'Prep Time',
			value: `${recipe.prepTimeMinutes} mins`,
			icon: Clock8
		},
		{
			label: 'Cook Time',
			value: `${recipe.cookTimeMinutes} mins`,
			icon: Clock4
		},
		{
			label: 'Difficulty',
			value: `${recipe.difficulty}`,
			icon: ChartColumnIncreasing
		},
		{
			label: 'Servings',
			value: `${recipe.servings}`,
			icon: HandPlatter
		}
	];

	const tags = recipe.tags;
</script>

{#snippet detailBadge({ ...props }: Detail)}
	<div class="inline-flex w-fit rounded-full border bg-muted px-2 py-0.5 text-sm">
		<props.icon class="mr-2 h-4 w-4" />
		<span class="text-xs">
			{props.value}
		</span>
	</div>
{/snippet}

<div class="flex flex-col overflow-hidden rounded-xl border shadow-md md:flex-row">
	<figure class="overflow-hidden md:w-1/2">
		<img src={recipe.image} class="h-full object-cover" alt={recipe.name} />
	</figure>
	<div class="flex flex-col items-start gap-4 p-8 md:w-1/2">
		<div class="flex w-full flex-row items-center justify-between">
			<h3 class="text-xl font-bold">{recipe.name}</h3>
			<RecipeRating rating={recipe.rating} />
		</div>
		<div class="flex flex-row flex-wrap items-center justify-start gap-4">
			{#each info as detail}
				{@render detailBadge(detail)}
			{/each}
		</div>
		<div class="flex flex-grow flex-col gap-4 md:flex-row">
			<div class="flex flex-col md:w-1/2">
				<h3 class="text-md mb-2 font-bold">Ingredients</h3>
				<ul class="ml-4 list-disc text-sm text-muted-foreground">
					{#each recipe.ingredients as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<div class="flex flex-col md:w-1/2">
				<h3 class="text-md mb-2 font-bold">Instructions</h3>
				<ol class="ml-4 list-outside list-decimal">
					{#each recipe.instructions as item}
						<li class="text-sm text-muted-foreground">
							{item}
						</li>
					{/each}
				</ol>
			</div>
		</div>
		<div class="flex flex-row flex-wrap gap-2 self-end">
			{#each tags as tag}
				{@render detailBadge({ value: tag })}
			{/each}
		</div>
	</div>
</div>
