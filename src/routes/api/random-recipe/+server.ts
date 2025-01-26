import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const recipe = await db.getRandomRecipe();
	return new Response(JSON.stringify(recipe), {
		headers: { 'Content-Type': 'application/json' }
	});
};
