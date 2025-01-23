import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	async function getRecipeById(id: string) {
		const request = await fetch(`https://dummyjson.com/recipes/${id}`);
		const response = await request.json();
		return response;
	}
	return {
		recipe: await getRecipeById(params.id)
	};
};
