<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	// TODO: Footer navigation
</script>

<footer class="container py-8">
	<div class="mb-2">
		<h3 class="text-xl">{siteConfig.companyName}</h3>
		<p class="text-muted-foreground">{siteConfig.tagLine}</p>
	</div>
	<div class="flex flex-col md:flex-row">
		<div class="flex w-full flex-col md:w-1/2">footer nav goes here</div>
		<div class="flex w-full flex-col md:w-1/2">legal info</div>
	</div>
</footer>
