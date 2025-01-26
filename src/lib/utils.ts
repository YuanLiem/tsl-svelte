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
		if (recipe.cuisine) cuisineSet.add(recipe.cuisine);
		if (recipe.tags.length > 0) {
			recipe.tags.forEach((tag: string) => {
				if (tag !== '') {
					tagSet.add(tag);
				}
			});
		}
	});
	return { tagSet, cuisineSet };
}
