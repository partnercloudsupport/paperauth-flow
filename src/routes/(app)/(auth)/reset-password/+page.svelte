<script lang="ts">
	import { Button, Link } from 'lib/components/_index';
	import { pages } from 'lib/utils/pages';
</script>

<div class="wrapper column">
	<p class="type-body-1">
		<span>Remember your password? </span>
		<span>
			<a href={pages.signIn}>Sign in</a>
		</span>
	</p>

	<form method="post" class="column">
		<div class="field">
			<label for="email" class="type-utility-1">Email</label>
			<input type="email" name="email" id="email" placeholder="Type here" />
		</div>

		<div class="field">
			<label for="password" class="type-utility-1">Password</label>
			<input type="password" name="password" id="password" placeholder="Type here" />
		</div>

		<Button buttonType="submit">Send recovery email</Button>
	</form>
	<Link>Forgot password?</Link>
</div>

<style lang="scss">
	.wrapper {
		row-gap: 2rem;
	}

	form {
		row-gap: 1rem;
	}

	label {
		opacity: 0.75;
		margin-bottom: 0.5rem;
		color: var(--theme-text-secondary);
	}

	.field {
		&:last-of-type {
			margin-bottom: 1rem;
		}
	}
</style>
