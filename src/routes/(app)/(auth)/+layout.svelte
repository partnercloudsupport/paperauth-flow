<script lang="ts">
	import { pages } from 'lib/utils/pages';
	import { Link } from 'lib/components/_index';
</script>

<div class="wrapper row a--center">
	<div class="wrapper__image flex ja--center">
		<img src="/images/temp.webp" alt="" />
	</div>

	<div class="wrapper__content column">
		<div class="wrapper__content-logo">
			<Link href={pages.home}>
				<img src="/images/paperauth-logo.svg" alt="Logo - Go home" />
			</Link>
		</div>

		<slot />
	</div>
</div>

<style lang="scss">
	.wrapper {
		min-height: 100vh;
	}

	.wrapper__image {
		overflow: hidden;
		width: 35%;
		min-height: 42rem;
		height: 100vh;

		background-color: var(--grey-30);
		img {
			height: 100%;
		}
	}

	.wrapper__content {
		row-gap: 2rem;
		padding: 2rem;
		width: 100%;
		min-width: 20rem;
		max-width: 32rem;
	}

	.wrapper__content-logo {
		margin-left: -1rem;
		img {
			width: 8rem;
		}
	}

	@media (max-width: 42rem) {
		.wrapper {
			justify-content: center;
		}

		.wrapper__image {
			height: fit-content;
			display: none;
		}

		.wrapper__content {
			width: 100%;
		}
	}
</style>
