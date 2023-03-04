<script lang="ts">
	import { Button, Link } from 'lib/components/_index';
	import { pages } from 'lib/utils/pages';
	import { onMount } from 'svelte';

	let isVisible = false;
	onMount(() => {
		isVisible = true;
	});
</script>

<div class="hero row a--center">
	<div class="hero__content column j--sb">
		<div class="hero__content-heading">
			<h1 class="head-display-1 head-light">World's safest eSignature solution</h1>
			<p>
				Easily send, sign, and track legally-binding documents with our blockchain-backed
				infrastructures.
			</p>
		</div>
		<div class="hero__content-cta column">
			<Link href={pages.signUp}>
				<Button buttonStyle="primary">Get started</Button>
			</Link>
			<p class="type-utility-1 type-italic">No commitment & no credit card required</p>
		</div>
	</div>
	<div class="hero__content flex ja--center">
		<img src="/images/temp.webp" alt="" />
	</div>
</div>

<style lang="scss">
	.hero {
		column-gap: 2rem;
		row-gap: 4rem;
		padding: 2rem 0 4rem;
		height: 100%;
	}

	.hero__content {
		overflow: hidden;
		row-gap: 2rem;
		padding: 2rem 0;
		width: 100%;
		height: 100%;

		aspect-ratio: 1 / 1;

		&:last-of-type {
			min-height: 32rem;
			height: calc(80vh - 4rem);
		}

		img {
			width: 100%;
			object-fit: cover;
		}
	}

	.hero__content-heading {
		padding-right: 2rem;

		p {
			margin-top: 2rem;
			padding-right: 15%;
			color: var(--theme-text-color--light);
		}
	}

	.hero__content-cta {
		column-gap: 0.5rem;
		row-gap: 0.5rem;

		p {
			color: var(--theme-text-color--light);
		}
	}

	@media (max-width: 66rem) {
		.hero {
			padding: 4rem 0 6rem;
			flex-direction: column;

			text-align: center;
		}

		.hero__content {
			align-items: center;
			aspect-ratio: unset;

			p {
				padding: 0;
				margin: 0 auto;
				max-width: 28rem;
			}

			img {
				height: unset;
				width: 100%;
			}
		}

		.hero__content-cta {
			align-items: center;
		}
	}

	@keyframes grow {
		0% {
			background-position: 0% 0;
			background-size: 0 100%;
		}
		40% {
			background-position: 0% 0;
			background-size: 100% 100%;
		}
		60% {
			background-position: 100% 0;
			background-size: 200% 100%;
		}
		100% {
			background-position: 100% 0;
			background-size: 0% 200%;
		}
	}
</style>
