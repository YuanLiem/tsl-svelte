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
	recipes = $state<number[]>([]);

	constructor(listKey: string, list: Ingredient[]) {
		this.listKey = listKey;
		this.list = list;

		if (browser) {
			const item = localStorage.getItem(listKey);
			if (item) this.list = this.deserialize(item);
		}
		$effect(() => {
			localStorage.setItem(this.listKey, this.serialize(this.list));
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
	checkItem(input: string) {
		// TODO:checking items
	}
	deleteItem(input: Ingredient) {
		this.list = this.list.filter((item) => item.id !== input.id);
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
	return setContext(LIST_KEY, new GroceryList('_groceries', []));
}

export function getGroceryList() {
	return getContext<ReturnType<typeof setGroceryList>>(LIST_KEY);
}
