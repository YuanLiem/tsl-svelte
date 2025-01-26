<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	let { increment, decrement, update, currentPage, totalPages } = $props();
</script>

<div class="mx-auto flex max-w-lg flex-row justify-center gap-10 py-8">
	<button
		onclick={decrement}
		disabled={currentPage === 0}
		class="disabled:cursor-not-allowed disabled:opacity-20"><ChevronLeft /></button
	>
	{#each { length: totalPages } as _, page}
		<button
			onclick={() => update(page)}
			class={currentPage === page ? 'text-emerald-300 hover:opacity-80' : 'hover:opacity-80'}
		>
			{page + 1}
		</button>
	{/each}
	<button
		onclick={increment}
		disabled={currentPage + 1 >= totalPages}
		class="disabled:cursor-not-allowed disabled:opacity-20"><ChevronRight /></button
	>
</div>
