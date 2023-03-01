<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { authenticate, unauthenticate, storeSignature } from 'flow/blocto';
	import { IbmCloudSecretsManager, Pen } from 'carbon-icons-svelte';
	import { Button, SpinningWheel } from 'lib/components/_index';
	import { supabaseClient } from 'lib/utils/supabase';
	import { flowUser } from 'flow/stores';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SignPad from './components/SignPad.svelte';
	import { goto } from '$app/navigation';
	import { pages } from 'lib/utils/pages';

	$: w = 0;

	let loading: boolean = false;
	let submitError: string = '';

	let screenOrientation: 'portrait' | 'landscape' = 'portrait';

	let currentStep: 'create' | 'authenticate' | 'sign' = 'create';

	const user: User | null = $page.data.session?.user ?? null;

	let wrongSafe = false;
	async function openSafe() {
		await authenticate();

		if ($page.data.profile?.wallet_address !== $flowUser?.addr) wrongSafe = true;
		currentStep = 'sign';
	}

	async function createSafe() {
		await authenticate();
		const { error } = await supabaseClient
			.from('profiles')
			.update({ wallet_address: $flowUser?.addr })
			.eq('user_id', user?.id);

		if (!error) currentStep = 'sign';
	}

	async function submitSignature(signature: string) {
		submitError = '';
		loading = true;

		console.log('Submitting signature to the blockchain');

		const result = await storeSignature(signature);
		if (!result) {
			submitError =
				'Could not access the blockchain. You can read the error in the console. Please contact support if the error persist.';
			loading = false;
			return;
		}

		console.log('Updating database');

		const { error } = await supabaseClient
			.from('profiles')
			.update({ has_signature: true })
			.eq('user_id', user?.id);
		if (!error) goto(pages.dashboard);
		else {
			submitError =
				'Could not access the database, but your signature was stored on the blockchain. Please contact support.';
		}

		loading = false;
	}

	onMount(() => {
		if ($page.data.profile?.wallet_address) currentStep = 'authenticate';
		if ($flowUser?.loggedIn) currentStep = 'sign';
	});
</script>

<svelte:window
	bind:innerWidth={w}
	on:orientationchange={(e) => {
		screenOrientation = screen.orientation.angle === 0 ? 'portrait' : 'landscape';
	}}
/>
<div class="wrapper">
	<div class="header column">
		<h1 class="head-layout-2">Hey {user?.user_metadata.first_name}, let's get you going</h1>
	</div>

	<div class="tabs row a--center">
		<div
			class="tab"
			class:tab--selected={currentStep === 'create' || currentStep === 'authenticate'}
		>
			<p class="type-decoration">Step 1</p>
		</div>
		<div class="tab" class:tab--selected={currentStep === 'sign'}>
			<p class="type-decoration">Step 2</p>
		</div>
	</div>

	{#if currentStep === 'create'}
		<div class="step column">
			<div class="row j--sb a--center">
				<p class="head-layout-1 type-bold">Create a safe</p>
				<IbmCloudSecretsManager size={24} title="Safe" />
			</div>
			<div class="step__inner column">
				<p class="step__sub head-component-1 type-semibold">
					Your safe is home to your eSignature and is owned by you alone.
				</p>

				<p class="step__description type-body-2">
					PaperAuth is the only eSignature solution where you truly own your signature. As it should
					be. Since we don't store your signature, you need to create a safe to store it in.
				</p>

				<p class="type-utility-1 type-italic">
					PaperAuth will not be able to retrieve your eSignature if you lose access to your safe,
					but your documents will remain available.
				</p>
			</div>
			<Button on:button_click={createSafe}>Create my safe</Button>
		</div>
	{:else if currentStep === 'authenticate'}
		<div class="step column">
			<div class="row j--sb a--center">
				<p class="head-layout-1 type-bold">Connect to your safe</p>
				<IbmCloudSecretsManager size={24} title="Safe" />
			</div>
			<div class="step__inner column">
				<p class="step__description type-body-2">
					Your account has already been linked to a safe. Connect to your safe to create your
					eSignature.
				</p>
				{#if wrongSafe}
					<Button
						on:button_click={async () => {
							await unauthenticate();
							wrongSafe = false;
						}}>Unauthenticate this safe</Button
					>

					<p class="type-utility-1 type-error">
						Your safe address doesn't match your previous one.
					</p>
				{:else}
					<Button on:button_click={openSafe}>Open safe</Button>
				{/if}
			</div>
		</div>
	{:else if currentStep === 'sign'}
		<div class="step column">
			<div class="row j--sb a--center">
				<p class="head-layout-1 type-bold">Create your eSignature</p>
				<Pen size={24} title="Safe" />
			</div>
			<div class="step__inner column">
				<p class="step__description type-body-2">
					Make sure that your eSignature is the same as your pen-and-paper signature.
				</p>
			</div>

			{#if submitError}
				<p class="type-utility-1 type-error">{submitError}</p>
			{/if}

			{#if w >= 672}
				{#if loading}
					<div class="row a--center">
						<SpinningWheel />
						<p class="type-utility-1 type-italic">Hold on, this can take a minute...</p>
					</div>
				{:else}
					<SignPad
						on:sign_submit={(e) => {
							submitSignature(e.detail);
						}}
					/>
				{/if}
			{:else if screenOrientation === 'portrait'}
				<img
					class="step__img"
					src="/images/rotate-device.svg"
					alt="Rotate device to landscape mode"
					title="Rotate device to landscape mode"
				/>
				<p class="type-utility-1">
					To create your signature, rotate your device to landscape mode.
				</p>
			{:else if loading}
				<div class="row a--center">
					<SpinningWheel />
					<p class="type-utility-1 type-italic">Hold on, this can take a minute...</p>
				</div>
			{:else}
				<SignPad
					on:sign_submit={(e) => {
						submitSignature(e.detail);
					}}
				/>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		row-gap: 1rem;
		padding-bottom: 2rem;
	}

	.header {
		padding: 2rem 0;
		row-gap: 1rem;
	}

	.tabs {
		column-gap: 1rem;
		border-bottom: 2px solid var(--grey-20);
	}

	.tab {
		padding: 0.5rem 1rem 0.5rem 0.5rem;
	}

	.tab--selected {
		margin-bottom: -2px;
		border-bottom: 2px solid var(--blue-60);
	}

	.step {
		padding: 2rem 0;
		row-gap: 2rem;
	}
	.step__inner {
		row-gap: 2rem;
		max-width: max(32rem, 60%);
	}

	.step__sub {
		color: var(--theme-text-color--light);
	}

	.step__description {
		margin-top: 0.25rem;
	}

	.step__img {
		max-width: 4rem;
	}
</style>
