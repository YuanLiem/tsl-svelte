<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getGroceryList } from '$lib/stores/grocery-list.svelte';
	import { cn } from '$lib/utils';
	import { X } from 'lucide-svelte';

	const groceries = getGroceryList();
</script>

<div class="h-full content-center">
	<div class="mx-auto max-w-xl rounded-xl border bg-primary-foreground p-8 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">Grocery List</h1>
		{#if groceries.list.length > 0}
			<ul data-testid="grocery-list" class="mb-8 flex flex-col gap-4">
				{#each groceries.list as item (item.id)}
					<li data-testid="grocery-item" class="flex items-center justify-between">
						<input bind:checked={item.checked} type="checkbox" />
						<p class={cn(item.checked ? 'text-muted-foreground line-through' : '', 'ml-4 w-full')}>
							{item.name}
						</p>
						<Button size="icon" variant="destructive" onclick={() => groceries.deleteItem(item)}>
							<X class="h-4 w-4" />
						</Button>
					</li>
				{/each}
			</ul>
			<Button variant="destructive" onclick={() => groceries.clearList()}>Clear List</Button>
		{:else}
			<h2 class="font-xl mb-2">Nothing on the list!</h2>
			<p class="text-muted-foreground">
				<a class="text-teal-300 hover:opacity-80" href="/recipes"> Find</a> something you want to make
				and generate a grocery list!
			</p>
		{/if}
	</div>
</div>
