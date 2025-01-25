<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getGroceryList } from '$lib/stores/grocery-list.svelte';

	const groceries = getGroceryList();
</script>

<div class="h-full content-center">
	<div class="mx-auto max-w-xl rounded-xl border bg-primary-foreground p-8 shadow-md">
		{#if groceries.list.length > 0}
			<ul class="flex flex-col gap-2">
				{#each groceries.list as item (item.id)}
					<li class="flex justify-between">
						<input bind:checked={item.checked} type="checkbox" />
						{item.name}
						<Button size="icon" variant="destructive" onclick={() => groceries.deleteItem(item)}
							>X</Button
						>
					</li>
				{/each}
			</ul>
			<Button variant="destructive" onclick={() => groceries.clearList()}>Clear List</Button>
		{:else}
			<p class="text-muted-foreground">Please browse recipes and add groceries to your list..</p>
		{/if}
	</div>
</div>
