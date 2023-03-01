<script lang="ts">
	import { Email, LogoLinkedin, LogoTwitter } from 'carbon-icons-svelte';
	import { Button, Link } from 'lib/components/_index';
</script>

<div class="wrapper column">
	<h2 class="head-layout-1">Thanks for trying PaperAuth!</h2>

	<p class="type-body-1">
		This is where you would typically select your contacts, add the the required fields and send the
		document.
	</p>

	<p class="type-body-2">
		These features are not yet available... This is an alpha version of the app that has been built
		for the Flow Hackathon. I hope you enjoyed what I have built so far and I look forward to turn
		it into a fully-functional software real soon.
	</p>

	<p class="type-utility-1">
		I'm always open to feedback and suggestions, so feel free to reach out to me.
	</p>
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
		row-gap: 1rem;
		padding: 2rem 0;
		max-width: 41rem;
	}

	.contact {
		column-gap: 1rem;
	}
</style>
