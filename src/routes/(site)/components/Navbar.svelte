<script lang="ts">
	import { Menu } from 'carbon-icons-svelte';
	import { Button, Hamburger, Link } from 'lib/components/_index';
	import { browser } from '$app/environment';
	import { pages } from 'lib/utils/pages';
	import { slide } from 'svelte/transition';

	export let innerWidth: number;

	let mobileNavExpanded: boolean = false;
	let links: { name: string; href: string }[] = [
		{
			name: 'About',
			href: pages.home
		}
	];

	$: if (browser) document.body.classList[mobileNavExpanded ? 'add' : 'remove']('no--scroll');
</script>

<header class="sticky">
	<nav class="row j--sb a--center b--center">
		{#if innerWidth > 672}
			<div class="nav__content row a--center">
				<a class="logo column" href={pages.home}>
					<img src="/images/paperauth-logo.svg" alt="PaperAuth Home page" />
					<img src="/images/paperauth-logo.svg" alt="Home page link" />
				</a>
				{#each links as link}
					<Link href={link.href}>{link.name}</Link>
				{/each}
			</div>

			<div class="nav__content row a--center">
				<Link href={pages.signIn}>Sign in</Link>

				<Link href={pages.signUp}>
					<Button buttonStyle="primary">Get started</Button>
				</Link>
			</div>
		{:else}
			<Hamburger
				isActive={mobileNavExpanded}
				on:hamburger_click={(e) => (mobileNavExpanded = e.detail)}
			>
				<Menu />
			</Hamburger>

			<a class="logo column" href={pages.home}>
				<img src="/images/paperauth-icon.svg" alt="PaperAuth Home page" />
				<img src="/images/paperauth-icon.svg" alt="Home page link" />
			</a>
			{#if mobileNavExpanded}
				<div class="nav__mobile" transition:slide={{ duration: 400 }}>
					<ul class="column j--sb">
						<div>
							{#each links as link}
								<li class="nav__mobile-link">
									<Link href={link.href}>{link.name}</Link>
								</li>
							{/each}
						</div>
						<div>
							<li class="nav__mobile-link">
								<Link linkWidth="full" href={pages.signIn}>
									<Button buttonStyle="tertiary" buttonScalesToParent={true}>Sign in</Button>
								</Link>
							</li>
							<li class="nav__mobile-link">
								<Link linkWidth="full" href={pages.signUp}>
									<Button buttonScalesToParent={true}>Get started</Button>
								</Link>
							</li>
						</div>
					</ul>
				</div>
			{/if}
		{/if}
	</nav>
</header>

<style lang="scss">
	header {
		z-index: 999;
		width: 100%;
		background-color: var(--theme-background);
	}

	nav {
		column-gap: 1rem;
		padding: 0.25rem 2rem;
		max-width: calc(var(--max-document-width) + 2rem);
	}

	.nav__content {
		column-gap: 1rem;
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

	.nav__mobile {
		z-index: -1;
		position: fixed;
		top: 5rem;
		left: 0;
		padding: 0 2rem;

		width: 100vw;
		height: calc(100vh - 5rem);

		border-bottom: none;
		background-color: var(--theme-background);

		ul {
			list-style: none;
			padding: 1rem 0;
			height: 100%;
		}
	}

	.nav__mobile-link {
		margin-bottom: 1rem;
		width: 100%;
	}

	@media (max-width: 42rem) {
		nav {
			padding: 1rem 1rem;
			column-gap: 0.5rem;
		}
	}
</style>
