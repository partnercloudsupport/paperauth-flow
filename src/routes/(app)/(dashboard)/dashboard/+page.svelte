<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { Button, FileDropper, SpinningWheel } from 'lib/components/_index';
	import { authenticate, unauthenticate } from 'flow/blocto';
	import { uploader } from 'lib/utils/stores/uploader';
	import { flowUser } from 'flow/stores';
	import { pages } from 'lib/utils/pages';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const user: User | null = $page.data.session?.user ?? null;
	const profile = $page.data.profile ?? null;

	let pending: number = 0;
	let uploading: boolean = false;

	function setPdf(src: File) {
		uploading = true;
		const docUrl = src !== undefined ? URL.createObjectURL(src) : '';
		$uploader.documentName = src.name ?? '';
		$uploader.documentUrl = docUrl;
		goto(pages.sendTo);
		uploading = false;
	}
</script>

<div class="wrapper column">
	<div class="wrapper__inner column">
		<h1 class="head-layout-2 head-regular">
			<span>Welcome back,</span>
			<span>{user?.user_metadata.first_name}</span>
		</h1>
		<div class="statuses row a--center">
			<p class="status row a--center">
				<span class="status__tag tag--warning" />
				<span class="type-bold">{pending}</span>
				<span class="type-body-1-compact">Pending signature{pending > 1 ? 's' : ''}</span>
			</p>
			<p class="status row a--center">
				<span class="status__tag tag--warning" />
				<span class="type-bold">{pending}</span>
				<span class="type-body-1-compact">Waiting your signature{pending > 1 ? 's' : ''}</span>
			</p>
			<p class="status row a--center">
				<span class="status__tag" />
				<span class="type-bold">{pending}</span>
				<span class="type-body-1-compact">Unsent{pending > 1 ? 's' : ''}</span>
			</p>
			<p class="status row a--center">
				<span class="status__tag tag--success" />
				<span class="type-bold">{pending}</span>
				<span class="type-body-1-compact">Signed</span>
			</p>
		</div>
	</div>

	{#if profile?.wallet_address !== $flowUser?.addr}
		{#if $flowUser?.loggedIn}
			<h2>It seems you are not using the right safe</h2>
			<Button on:button_click={unauthenticate}>Close this safe</Button>
		{:else}
			<h2>Please open your safe to start signing and sending documents</h2>
			<Button on:button_click={authenticate}>Open your safe</Button>
		{/if}
	{:else}
		<div class="wrapper__inner column">
			<h3 class="head-component-1">Upload</h3>
			{#if !uploading}
				<FileDropper
					fileAllowMultiple={false}
					fileFormats={['pdf']}
					fileMaxTotalSize={2500000}
					on:file_drop={(e) => {
						if (e.detail[0] !== undefined) setPdf(e.detail[0]);
					}}
				/>
			{:else}
				<SpinningWheel />
			{/if}
		</div>
	{/if}

	<div class="wrapper__inner column">
		<h3 class="head-component-1">Recents</h3>
		<p class="type-body-1-compact type-italic">No recent document. Start by uploading one above.</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		row-gap: 1rem;
		padding-bottom: 2rem;
	}

	.wrapper__inner {
		padding: 2rem 0;
		row-gap: 1rem;
	}

	.statuses {
		column-gap: 1rem;
		row-gap: 1rem;
		margin-top: 0.5rem;
	}

	.status {
		column-gap: 0.5rem;
	}

	.status__tag {
		width: 0.5rem;
		height: 0.5rem;

		border-radius: 50%;
		background-color: var(--grey-30);
	}

	.tag--warning {
		background-color: var(--warning);
	}
	.tag--success {
		background-color: var(--success);
	}

	@media (max-width: 42rem) {
		.statuses {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
			grid-column-gap: 0.25rem;
			grid-row-gap: 0.5rem;
		}
	}
</style>
