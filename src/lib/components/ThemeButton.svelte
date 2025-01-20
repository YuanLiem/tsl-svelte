<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, mode } from 'mode-watcher';
</script>

<Button class="hidden md:flex" onclick={toggleMode} variant="outline" size="icon">
	{#if $mode === 'dark'}
		<Sun class="h-4 w-4" />
	{:else}
		<Moon class="h-4 w-4" />
	{/if}
</Button>
