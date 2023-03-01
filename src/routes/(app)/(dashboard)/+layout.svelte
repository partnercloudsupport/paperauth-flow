<script lang="ts">
	import { Button, Link, Section } from 'lib/components/_index';
	import { page } from '$app/stores';
	import Navbar from './components/Navbar.svelte';

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

{#if !$page.data.session}
	<h1 class="head-layout-1">Oops!</h1>
	<p class="type-body-1">Your session has expired. Please sign in again.</p>
	<Link>
		<Button>Sign in</Button>
	</Link>
{:else}
	<div class="wrapper">
		<Navbar {innerWidth} />
		<Section>
			<slot />
		</Section>
	</div>
{/if}

<style lang="scss">
</style>
