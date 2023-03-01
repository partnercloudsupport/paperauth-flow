<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let buttonTitle: string = '';
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
	function dispatchClick(e: MouseEvent) {
		if (disabled) {
			e.preventDefault();
			return;
		}

		dispatch('button_click', e);
	}
</script>

<button
	title={buttonTitle}
	type="button"
	tabindex={disabled ? -1 : 0}
	class="type-body-1-compact inline-flex ja--center"
	class:disabled
	on:click={dispatchClick}
>
	<div class="icon flex a--center">
		<slot />
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
