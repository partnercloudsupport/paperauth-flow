<script>
	import { Link } from 'lib/components/_index';
	import { pages } from 'lib/utils/pages';

	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
</script>

<footer>
	<div class="footer__content column j--sb b--center">
		<Link href={pages.home}>
			<img class="logo" src="/images/paperauth-logo.svg" alt="" />
		</Link>
		<div class="footer__content-footer">
			<div class="footer-links row j--sb a--center">
				<p class="type-utility-1 type-italic">© {currentYear} PaperAuth. All rights reserved.</p>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		z-index: 9;
		position: relative;
		padding: 0 2rem;
		width: 100%;
	}

	.logo {
		width: 10rem;
	}

	.footer__content {
		row-gap: 4rem;
		padding: 4rem 2rem;
		width: 100%;
		max-width: 82rem;
		height: 100%;
	}

	.footer__content-footer {
		width: 100%;
		padding-top: 1rem;

		border-top: 1px solid var(--theme-border-color);
	}

	.footer-links {
		column-gap: 0.5rem;
		opacity: 0.8;
	}

	@media (max-width: 42rem) {
		footer {
			padding: 0 0.5rem;
		}

		.footer__content {
			padding: 2rem 1rem;
		}
	}
</style>
