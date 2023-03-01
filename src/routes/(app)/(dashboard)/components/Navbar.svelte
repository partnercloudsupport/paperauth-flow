<script lang="ts">
	import { IbmCloudSecretsManager, User } from 'carbon-icons-svelte';
	import { Button, Hamburger, Link } from 'lib/components/_index';
	import { authenticate, unauthenticate } from 'flow/blocto';
	import { clickOutside } from 'lib/utils/functions/clickOutside';
	import { flowUser } from 'flow/stores';
	import { pages } from 'lib/utils/pages';

	export let innerWidth: number = 0;

	let profileIsExpanded: boolean = false;

	const links: { name: string; href: string }[] = [
		{
			name: 'Plans',
			href: pages.plans
		},
		{
			name: 'Support',
			href: pages.support
		}
	];

	const profileLinks: { name: string; href: string }[] = [
		{
			name: 'Settings',
			href: pages.user
		}
	];
</script>

<header class="sticky">
	<nav class="row j--sb a--center b--center">
		<div class="nav__content row a--center">
			{#if innerWidth > 672}
				<a class="logo column" href={pages.dashboard}>
					<img src="/images/paperauth-logo.svg" alt="PaperAuth Home page" />
					<img src="/images/paperauth-logo.svg" alt="Home page link" />
				</a>
			{:else}
				<a class="logo column" href={pages.dashboard}>
					<img src="/images/paperauth-icon.svg" alt="PaperAuth Home page" />
					<img src="/images/paperauth-icon.svg" alt="Home page link" />
				</a>
			{/if}
			{#each links as link}
				<Link href={link.href}>{link.name}</Link>
			{/each}
		</div>

		<div class="nav__content row a--center" use:clickOutside={() => (profileIsExpanded = false)}>
			<div class="network row a--center">
				<div class="network__state" />
				<p class="type-decoration">Alpha/Testnet</p>
			</div>
			<Hamburger
				isActive={profileIsExpanded}
				on:hamburger_click={(e) => (profileIsExpanded = e.detail)}
			>
				<User />
			</Hamburger>

			{#if profileIsExpanded}
				<ul class="profile__menu">
					{#if $flowUser?.loggedIn}
						<li class="row a--center j--sb">
							<span title="View your safe on the blockchain">
								<Link
									target="_blank"
									linkWidth="full"
									href="https://testnet.flowscan.org/account/{$flowUser?.addr}"
									>{$flowUser?.addr.slice(0, 6)}...{$flowUser?.addr.slice(-4)}</Link
								>
							</span>
							<span>
								<IbmCloudSecretsManager title="View your safe on the blockchain" />
							</span>
						</li>
					{/if}
					{#each profileLinks as link}
						<li class="flex a--center">
							<Link linkWidth="full" href={link.href}>{link.name}</Link>
						</li>
					{/each}
					<li>
						{#if !$flowUser?.loggedIn}
							<Button
								buttonStyle="tertiary"
								buttonScalesToParent={true}
								on:button_click={authenticate}>Open safe</Button
							>
						{/if}
						<form method="post" action={pages.signOut}>
							<Button
								buttonType="submit"
								buttonScalesToParent={true}
								on:button_click={async () => {
									await unauthenticate();
								}}>Sign Out</Button
							>
						</form>
					</li>
				</ul>
			{/if}
		</div>
	</nav>
</header>

<style lang="scss">
	ul {
		list-style: none;
	}

	header {
		z-index: 999;
		width: 100%;
		background-color: var(--theme-background);
	}

	nav {
		column-gap: 1rem;
		padding: 1rem 2rem;
		max-width: calc(var(--max-document-width));
	}

	.nav__content {
		z-index: 2;
		position: relative;
		column-gap: 1rem;
	}

	.network {
		column-gap: 0.25rem;
		padding: 0.25rem 0.5rem;

		border-radius: 99px;
		border: 1px solid var(--theme-border-color);
		background-color: var(--grey-10);
		p {
			color: var(--grey-60);
		}
	}

	.network__state {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background-color: var(--grey-30);
	}

	.logo {
		overflow: hidden;
		row-gap: 1.25rem;
		min-width: 1.25rem;
		height: 1.25rem;

		img {
			height: 100%;

			transition: all var(--fast) var(--standard-productive);
		}

		&:hover {
			img {
				transform: translateY(-100%) translateY(-1.25rem);
			}
		}
	}

	.profile__menu {
		z-index: 1;
		position: absolute;
		top: 100%;
		right: 0;
		min-width: 12rem;
		width: fit-content;

		background-color: var(--theme-background);
		box-shadow: 0 2px 6px #0000004d;

		li {
			padding: 0.875rem 1.5rem;

			&:last-of-type {
				padding: 0;
			}
		}
	}

	@media (max-width: 42rem) {
		nav {
			padding: 1rem 1rem;
		}

		.network {
			display: none;
		}
	}
</style>
