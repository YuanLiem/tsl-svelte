import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import type { Recipe } from '$lib/types/types';

type Ingredient = {
	id: string;
	name: string;
	recipeId: number;
	checked: boolean;
};

export class GroceryList {
	listKey = '';
	list = $state<Ingredient[]>([]);
	recipeKey = '';
	recipes = $state<number[]>([]);

	constructor(listKey: string, list: Ingredient[], recipeKey: string, recipes: number[]) {
		this.listKey = listKey;
		this.list = list;
		this.recipeKey = recipeKey;
		this.recipes = recipes;

		if (browser) {
			const list = localStorage.getItem(listKey);
			const recipes = localStorage.getItem(recipeKey);

			if (list) this.list = this.deserialize(list);
			if (recipes) this.recipes = this.deserialize(recipes);
		}
		$effect(() => {
			localStorage.setItem(this.listKey, this.serialize(this.list));
			localStorage.setItem(this.recipeKey, this.serialize(this.recipes));
		});
	}

	addItems(input: Recipe) {
		for (let i = 0; i < input.ingredients.length; i++) {
			this.list.push({
				id: crypto.randomUUID(),
				name: this.parseIngredient(input.ingredients[i]),
				recipeId: input.id,
				checked: false
			});
		}
		this.recipes.push(input.id);
	}

	deleteItem(input: Ingredient) {
		if (this.list.length === 1) {
			this.deleteRecipe(input.recipeId);
		}
		this.list = this.list.filter((item) => item.id !== input.id);
	}

	deleteRecipe(input: number) {
		this.recipes = this.recipes.filter((recipe) => recipe !== input);
	}

	clearList() {
		this.list = [];
		this.recipes = [];
	}

	parseIngredient(item: string) {
		let index = item.indexOf(',');
		if (index && index > 0) {
			return item.slice(0, index);
		} else {
			return item;
		}
	}

	serialize(item: any) {
		return JSON.stringify(item);
	}

	deserialize(item: string) {
		return JSON.parse(item);
	}
}

const LIST_KEY = Symbol('GROCERY_LIST');

export function setGroceryList() {
	return setContext(LIST_KEY, new GroceryList('_groceries', [], '_recipes', []));
}

export function getGroceryList() {
	return getContext<ReturnType<typeof setGroceryList>>(LIST_KEY);
}
