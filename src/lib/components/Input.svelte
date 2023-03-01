<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	export let inputName: string = '';
	export let inputType: 'text' | 'email' = 'text';
	export let inputPlaceholder: string = '';
	export let inputMinLength: number = 0;
	export let inputMaxLength: number = 9999;
	export let inputIsRequired: boolean = false;

	let required = inputIsRequired ? true : undefined;

	let value: string = '';
	let inputId: string = 'input-id-' + (counter++).toString();

	const dispatch = createEventDispatcher();
	// infer the type of the event from the value prop
	function dispatchInput(e: Event) {
		if (disabled) {
			e.preventDefault();
			return;
		}

		dispatch('input', value);
	}
</script>

{#if inputType === 'text'}
	<input
		bind:value
		{required}
		type="text"
		class:disabled
		name={inputName}
		id={inputId}
		tabindex={disabled ? -1 : 0}
		minlength={inputMinLength}
		maxlength={inputMaxLength}
		placeholder={inputPlaceholder}
		on:input={dispatchInput}
	/>
{:else}
	<input
		bind:value
		{required}
		type="email"
		class:disabled
		name={inputName}
		id={inputId}
		tabindex={disabled ? -1 : 0}
		minlength={inputMinLength}
		maxlength={inputMaxLength}
		placeholder={inputPlaceholder}
		on:input={dispatchInput}
	/>
{/if}

<style lang="scss">
	input {
		position: relative;
		appearance: none;
		outline: none;
		-webkit-appearance: none;
		padding: 0.875rem 4rem 0.875rem 1rem;
		width: 100%;
		height: 3rem;

		border: none;
		border-bottom: 1px solid var(--theme-input-text-color);
		background-color: var(--theme-input-background-color);
		color: var(--theme-input-text-color);

		&::placeholder {
			color: var(--theme-text-secondary);
			opacity: 0.5;
		}

		transition: background-color var(--fastest) var(--standard-productive);
	}
</style>
