import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Recipe } from './types/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRecipeFilters(input: Array<Recipe & { keywords: string }>) {
	let tagSet = new Set();
	let cuisineSet = new Set();
	input.forEach((recipe) => {
		cuisineSet.add(recipe.cuisine);
		recipe.tags.forEach((tag: string) => {
			tagSet.add(tag);
		});
	});
	return { tagSet, cuisineSet };
}
