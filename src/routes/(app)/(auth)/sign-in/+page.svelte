<script lang="ts">
	import { Button, Link } from 'lib/components/_index';
	import { pages } from 'lib/utils/pages';
</script>

<div class="wrapper column">
	<p class="type-body-1">
		<span>Don't have an account? </span>
		<span>
			<a href={pages.signUp}>Sign up</a>
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

		<Button buttonType="submit">Sign in</Button>
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

	.field {
		&:last-of-type {
			margin-bottom: 1rem;
		}
	}
</style>
