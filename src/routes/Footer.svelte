<script lang="ts">
	import { siteConfig } from '$lib/config/site';
</script>

<footer class="bg-primary-foreground py-8">
	<div class="container">
		<div class="mb-2">
			<h3 class="text-xl">{siteConfig.companyName}</h3>
			<p class="text-muted-foreground">{siteConfig.tagLine}</p>
		</div>
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-row gap-2 md:w-1/2 md:flex-col">
				{#each siteConfig.menuItems as item}
					<a href={item.slug} target="_blank" class="w-fit text-sm hover:text-muted-foreground"
						>{item.label}</a
					>
				{/each}
			</div>
			<div class="flex flex-row items-end justify-end gap-4 pt-4 md:w-1/2">
				{#each siteConfig.socials as social}
					<a href={social.href} class="hover:opacity-80" target="_blank"
						><social.icon class="h-4 w-4" /></a
					>
				{/each}
			</div>
		</div>
		<div class="mt-4 flex flex-col gap-2 border-t pt-4 md:flex-row md:gap-4">
			{#each siteConfig.footerLegal as item}
				<a href={item.slug} target="_blank" class="text-xs text-muted-foreground hover:text-primary"
					>{item.label}</a
				>
			{/each}
		</div>
	</div>
</footer>
