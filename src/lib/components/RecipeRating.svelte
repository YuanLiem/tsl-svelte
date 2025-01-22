<script lang="ts">
	import { Star } from 'lucide-svelte';

	type Props = {
		rating: number;
	};
	let { rating }: Props = $props();
</script>

<span
	class="inline-flex h-fit items-center rounded-xl border bg-primary-foreground px-2 py-0.5 text-sm text-muted-foreground"
>
	<Star class="mr-2 inline-flex h-4 w-4 fill-yellow-400 stroke-none" />
	{rating}
</span>
