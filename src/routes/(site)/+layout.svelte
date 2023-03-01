<script lang="ts">
	import { Navbar, Footer } from './components/_index';

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<Navbar {innerWidth} />
<slot />
<Footer />

<style lang="scss">
</style>
