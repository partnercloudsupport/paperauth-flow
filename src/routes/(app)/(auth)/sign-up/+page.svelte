<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { browser } from '$app/environment';
	import { Button } from 'lib/components/_index';
	import { pages } from 'lib/utils/pages';

	let showVerifyEmail = false;
</script>

<div class="wrapper column">
	<p class="type-body-1">
		<span>Already have an account? </span>
		<span>
			<a href={pages.signIn}>Sign in</a>
		</span>
	</p>

	{#if !showVerifyEmail}
		<form
			method="post"
			class="column"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (!browser) return;

					if (result.type === 'success' && result.data) showVerifyEmail = true;

					if (result.type === 'failure') {
						await applyAction(result);
						update();
					}
				};
			}}
		>
			<div class="field">
				<label for="email" class="type-utility-1">Email</label>
				<input type="email" name="email" id="email" placeholder="Type here" />
			</div>

			<div class="form__group row">
				<div class="field">
					<label for="first-name" class="type-utility-1">First name</label>
					<input type="text" name="first-name" id="first-name" placeholder="Type here" />
				</div>

				<div class="field">
					<label for="last-name" class="type-utility-1">Last name</label>
					<input type="text" name="last-name" id="last-name" placeholder="Type here" />
				</div>
			</div>

			<div class="field">
				<label for="password" class="type-utility-1">Password</label>
				<input type="password" name="password" id="password" placeholder="Type here" />
			</div>

			<p class="agreements type-utility-1">
				<span>By signing up, you agree to our </span>
				<a href={pages.termsOfService}>Terms of Service</a>
				<span>and </span>
				<a href={pages.privacyPolicy}>Privacy Policy</a>
			</p>
			<Button buttonType="submit">Sign up</Button>
		</form>
	{:else}
		<h2>Verify your email</h2>
		<p class="type-body-1">
			Please check your inbox and verify your account by clicking the link in the email.
		</p>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		row-gap: 2rem;
	}

	form {
		row-gap: 1rem;
	}

	.form__group {
		column-gap: 1rem;
	}

	.field {
		&:last-of-type {
			margin-bottom: 1rem;
		}
	}

	.agreements {
		color: var(--theme-text-color--light);
	}
</style>
