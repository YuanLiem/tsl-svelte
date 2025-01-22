import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/types';

export const load: PageServerLoad = async () => {
	async function getRecipeChunk(limit: number = 10, skip: number = 0): Promise<Recipe[]> {
		const request = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`);
		const response = await request.json();

		return response.recipes;
	}
	return {
		recipes: getRecipeChunk()
	};
};
