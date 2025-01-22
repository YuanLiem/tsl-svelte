<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, mode } from 'mode-watcher';
	import type { ButtonProps } from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';

	let { ...props }: ButtonProps = $props();
</script>

<Button class={cn('rounded-full', props.class)} onclick={toggleMode} variant="outline" size="icon">
	{#if $mode === 'dark'}
		<Sun class="h-4 w-4" />
	{:else}
		<Moon class="h-4 w-4" />
	{/if}
</Button>
