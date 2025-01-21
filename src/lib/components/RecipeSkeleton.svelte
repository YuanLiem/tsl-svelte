<div
	class="flex h-full animate-pulse flex-col overflow-hidden rounded-xl border shadow-md dark:bg-neutral-800 md:flex-row"
>
	<div class="h-64 w-full bg-neutral-300 dark:bg-neutral-700 md:w-1/2"></div>
	<div class="w-full p-4 md:w-1/2">
		<div class="mt-4 h-2 w-5/6 rounded-lg bg-neutral-300 dark:bg-neutral-500"></div>
		{#each { length: 4 }}
			<div class="mt-4 h-2 w-4/5 rounded-lg bg-neutral-300 dark:bg-neutral-500"></div>
			<div class="mt-4 h-2 w-3/5 rounded-lg bg-neutral-300 dark:bg-neutral-500"></div>
		{/each}
	</div>
</div>
