<script lang="ts">
	import { Email, LogoLinkedin, LogoTwitter } from 'carbon-icons-svelte';
	import { Link } from 'lib/components/_index';
</script>

<div class="wrapper column">
	<h2>Have a question?</h2>
	<p class="type-utility-1">FAQ coming soon</p>
	<p class="type-body-1">Contact me below</p>
	<div class="contact row a--center">
		<Link href="https://twitter.com/TweetedByOrange">
			<LogoTwitter size={32} />
		</Link>
		<Link href="mailto:samuelbouliane@gmail.com">
			<Email size={32} />
		</Link>
		<Link href="https://www.linkedin.com/in/samuel-bouliane/">
			<LogoLinkedin size={32} />
		</Link>
	</div>
</div>

<style lang="scss">
	.wrapper {
		row-gap: 2rem;
	}

	.contact {
		column-gap: 1rem;
	}
</style>
