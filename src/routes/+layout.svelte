<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>
