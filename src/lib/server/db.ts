import type { Recipe } from '$lib/types/types';

export const db = {
	getRandomRecipe: async (): Promise<Recipe> => {
		const randomIndex = Math.floor(Math.random() * (50 - 1));
		const response = await fetch(`https://dummyjson.com/recipes/${randomIndex}`);
		const data = await response.json();

		return data;
	}
};
