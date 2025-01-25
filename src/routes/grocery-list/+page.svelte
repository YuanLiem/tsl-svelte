<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getGroceryList } from '$lib/stores/grocery-list.svelte';

	const groceries = getGroceryList();
</script>

<ul>
	{#each groceries.list as item}
		<li>
			{item.name}
			<Button size="icon" variant="destructive" onclick={() => groceries.deleteItem(item)}>X</Button
			>
		</li>
	{/each}
</ul>
