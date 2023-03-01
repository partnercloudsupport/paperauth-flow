<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	export let buttonType: 'button' | 'submit' | 'reset' = 'button';
	export let buttonStyle: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let buttonScalesToParent: boolean = false;

	let button: HTMLButtonElement;

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
	bind:this={button}
	type={buttonType}
	tabindex={disabled ? -1 : 0}
	class:disabled
	class="btn--{buttonStyle} type-body-1-compact inline-flex a--center"
	class:button-scales-to-parent={buttonScalesToParent}
	class:has--icon={$$slots.icon}
	on:click={dispatchClick}
>
	{#if $$slots.icon}
		<slot name="icon" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	button {
		position: relative;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		vertical-align: top;
		flex-shrink: 0;

		padding: 0.875rem 1.5rem;
		margin: 0;
		width: max-content;
		min-width: 3rem;

		border: 1px solid transparent;

		transition: border-color, background-color, box-shadow, color,
			var(--fastest) var(--standard-productive);

		&:active {
			transform: scaleY(0.95);
		}
	}

	.btn--primary {
		background-color: var(--theme-button-primary-background-color);
		color: var(--theme-button-primary-text-color);

		&:hover {
			background-color: var(--theme-button-primary-background-color--hover);
			color: var(--theme-button-primary-text-color--hover);
		}
	}

	.btn--secondary {
		background-color: var(--theme-button-secondary-background-color);
		color: var(--theme-button-secondary-text-color);

		&:hover {
			background-color: var(--theme-button-secondary-background-color--hover);
			color: var(--theme-button-secondary-text-color--hover);
		}
	}

	.btn--tertiary {
		border: 1px solid var(--theme-button-tertiary-text-color);
		background-color: var(--theme-button-tertiary-background-color);
		color: var(--theme-button-tertiary-text-color);

		&:hover {
			background-color: var(--theme-button-tertiary-background-color--hover);
			color: var(--theme-button-tertiary-text-color--hover);
		}
	}

	.button-scales-to-parent {
		width: 100%;
	}

	.has--icon {
		padding: 0.875rem 1rem;
	}

	.disabled {
		cursor: not-allowed;
		background-color: var(--theme-background--disabled);

		color: var(--theme-text--disabled);

		&:active {
			transform: none;
		}
	}
</style>
