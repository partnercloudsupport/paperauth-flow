<script lang="ts">
	import { Close } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let disabled: boolean = false;
	export let isActive: boolean = false;
</script>

<button
	class="type-body-1-compact inline-flex ja--center"
	class:disabled={disabled === true}
	tabindex={disabled ? -1 : 0}
	aria-expanded={isActive}
	on:click={() => {
		dispatch('hamburger_click', !isActive);
	}}
>
	<div class="icon flex a--center">
		{#if isActive}
			<Close />
		{:else}
			<slot />
		{/if}
	</div>
</button>

<style lang="scss">
	button {
		cursor: pointer;
		width: 3rem;
		height: 3rem;
		padding: 0.875rem;

		border: none;
		background-color: transparent;
		color: var(--theme-text-primary);

		&:hover {
			background-color: var(--grey-20);
		}
		&:active {
			border-color: var(--grey-20);
			box-shadow: inset 0 0 0 1px var(--grey-20), inset 0 0 0 2px var(--theme-text-primary);
		}

		.icon {
			color: inherit;
		}
	}
</style>
