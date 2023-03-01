<script lang="ts">
	import { page } from '$app/stores';
	import { pages } from '$lib/utils/pages';
	import { Link, Seo } from '$lib/components/_index';
</script>

<Seo title="Error" description="Error page" />
<div class="wrapper column j--center b--center">
	{#if $page.error}
		<h2 class="type-decoration">—{$page.status}</h2>
		<h1 class="head-layout-1 head-bold">
			{$page.error.message}
		</h1>
	{:else}
		<h1 class="head-layout-1 type-bold">Something went wrong</h1>
	{/if}
	<Link href={pages.home}>Go back home</Link>
</div>

<style lang="scss">
	.wrapper {
		height: calc(100vh - 5.5rem);
		width: fit-content;
	}
</style>
