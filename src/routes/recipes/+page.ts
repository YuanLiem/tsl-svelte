import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const limit = Number(url.searchParams.get('limit') || 12);
	const skip = Number(url.searchParams.get('skip') || 0);
	async function getRecipeChunk(limit: number = 10, skip: number = 0) {
		const request = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`);
		const response = await request.json();
		return response;
	}
	return {
		recipeData: await getRecipeChunk(limit, skip),
		allRecipes: await getRecipeChunk(50, 0)
	};
};
