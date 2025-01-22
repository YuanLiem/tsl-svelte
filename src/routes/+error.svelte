<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/state';
</script>

<div class="container">
	<div class="h-screen content-center">
		{#if page?.error?.message}
			<h1 class="mb-4 text-2xl font-bold">Something went wrong..</h1>
			<a href="/" class={buttonVariants({ size: 'lg' })}>Go back</a>
		{/if}
	</div>
</div>
