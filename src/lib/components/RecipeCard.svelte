<script lang="ts">
	import type { Recipe, RecipeFeature } from '$lib/types/types';
	import {
		ChartColumnIncreasing,
		Clock4,
		Clock8,
		HandPlatter,
		GaugeCircleIcon
	} from 'lucide-svelte';
	import RecipeRating from './RecipeRating.svelte';
	import RecipeBadge from './RecipeBadge.svelte';
	import { getGroceryList } from '$lib/stores/grocery-list.svelte';
	import Button from './ui/button/button.svelte';

	let { recipe }: { recipe: Recipe } = $props();
	let groceries = getGroceryList();

	const info: RecipeFeature[] = [
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

	const calories = {
		label: 'Calories/Serving',
		value: `${recipe.caloriesPerServing} kcal`,
		icon: GaugeCircleIcon
	};

	const tags = recipe.tags;
</script>

<div
	class="flex flex-col overflow-hidden rounded-xl border bg-primary-foreground shadow-md md:flex-row"
>
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
				<RecipeBadge features={detail} />
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
		<div class="flex w-full flex-row flex-wrap items-center justify-between gap-4">
			<div class="inline-flex flex-wrap gap-4">
				<RecipeBadge features={calories} />
				{#each tags.slice(0, 3) as tag}
					<RecipeBadge features={{ value: tag }} />
				{/each}
			</div>
			<Button
				disabled={groceries.recipes.includes(recipe.id) ? true : false}
				onclick={() => groceries.addItems(recipe)}
			>
				{groceries.recipes.includes(recipe.id) ? 'Added  to list' : 'Add to list'}
			</Button>
		</div>
	</div>
</div>
