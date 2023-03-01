<script lang="ts">
	import '$lib/styles/main.scss';
	import { onMount } from 'svelte';
	import { theme } from 'lib/utils/stores/theme';

	onMount(() => {
		document.documentElement.dataset.theme = $theme;
	});
</script>

<main>
	<slot />
</main>

<style lang="scss">
</style>
