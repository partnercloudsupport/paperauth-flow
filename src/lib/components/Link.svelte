<script lang="ts">
	import { onMount } from 'svelte';

	export let disabled: boolean = false;
	export let href: string = '#';
	export let target: '_self' | '_blank' = '_self';
	export let linkWidth: 'fit' | 'full' = 'fit';

	let link: HTMLAnchorElement;

	function dispatchClick() {
		if (link.childNodes.length > 0 && link.childNodes[0].nodeType !== Node.TEXT_NODE) {
			link.click();
		}
	}

	onMount(() => {});
</script>

<a
	class="type-body-1-compact w--{linkWidth}"
	{href}
	{target}
	tabindex={disabled ? -1 : 0}
	bind:this={link}
	on:click={dispatchClick}
>
	{#if $$slots}
		<slot />
	{/if}
</a>

<style lang="scss">
	a {
		z-index: 1;
		position: relative;
		display: block;
		overflow: hidden;
		width: fit-content;

		transition: all var(--fastest) var(--standard-productive);
		text-decoration: none;
		transition: color 240ms ease;
	}

	.w--full {
		width: 100%;
	}
</style>
