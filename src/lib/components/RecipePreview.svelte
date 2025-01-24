<script lang="ts">
	import type { Recipe } from '$lib/types/types';
	import RecipeBadge from './RecipeBadge.svelte';
	import RecipeRating from './RecipeRating.svelte';
	let { props }: { props: Recipe } = $props();
	import { ChartColumnIncreasing, Earth } from 'lucide-svelte';

	const features = [
		{
			label: 'Difficulty',
			value: `${props.difficulty}`,
			icon: ChartColumnIncreasing
		},
		{
			label: 'Cuisine',
			value: `${props.cuisine}`,
			icon: Earth
		}
	];
</script>

<div class="mx-auto h-full max-w-[80%] overflow-hidden rounded-xl shadow-md">
	<figure class="relative overflow-hidden">
		<img
			class="z-10 aspect-auto object-cover transition-transform duration-300 hover:scale-105"
			src={props.image}
			alt={props.name}
		/>
	</figure>
	<div class="flex flex-col gap-2 p-4">
		<div class="flex w-full flex-row justify-between">
			<h3 class="text-wrap break-words text-sm font-bold">
				{props.name}
			</h3>
			<RecipeRating rating={props.rating} />
		</div>
		<div class="flex flex-row flex-wrap justify-between">
			{#each features as feature}
				<RecipeBadge features={feature} />
			{/each}
		</div>
	</div>
</div>
