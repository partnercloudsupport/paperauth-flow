<script lang="ts">
	import { Button } from 'lib/components/_index';
	import { page } from '$app/stores';
	import { api } from 'lib/utils/pages';

	const customerId: string = $page.data.session?.user.user_metadata.stripe_customer_id;

	const user = $page.data.session?.user ?? null;

	async function openCustomerPortal() {
		await fetch(api.createCustomerPortal, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				customerId: customerId
			})
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	}
</script>

<div class="wrapper column">
	<form method="post" action="" class="column">
		<h2 class="head-component-1">Update profile info</h2>

		<div class="form__group row-to-column">
			<div class="field">
				<label for="first_name">First name</label>
				<input
					type="text"
					name="first_name"
					id="first_name"
					placeholder="Type here"
					value={user?.user_metadata.first_name}
				/>
			</div>
			<div class="field">
				<label for="last_name">Last name</label>
				<input
					type="text"
					name="last_name"
					id="last_name"
					placeholder="Type here"
					value={user?.user_metadata.last_name}
				/>
			</div>
		</div>
		<Button buttonType="submit">Update</Button>
	</form>

	<form method="post" action="" class="column">
		<h2 class="head-component-1">Change password</h2>
		<div class="field">
			<label for="password">Current password</label>
			<input type="password" name="password" id="password" placeholder="Type here" />
		</div>
		<div class="form__group row-to-column">
			<div class="field">
				<label for="new_password">New password</label>
				<input type="password" name="new_password" id="new_password" placeholder="Type here" />
			</div>
			<div class="field">
				<label for="new_password_confirm">Confirm new password</label>
				<input
					type="password"
					name="new_password_confirm"
					id="new_password_confirm"
					placeholder="Type here"
				/>
			</div>
		</div>
		<Button buttonType="submit">Update</Button>
	</form>

	<form method="post" action="" class="column">
		<h2 class="head-component-1">Edit billing info</h2>
		<Button on:button_click={openCustomerPortal}>Update</Button>
	</form>
</div>

<style lang="scss">
	.wrapper {
		row-gap: 4rem;
		padding-bottom: 4rem;
	}

	form {
		row-gap: 1rem;
		padding-top: 2rem;

		border-top: 1px solid var(--theme-border-color);
		&:first-of-type {
			border-top: none;
		}
	}

	.form__group {
		column-gap: 1rem;
		row-gap: 1rem;
	}

	.field {
		width: 100%;
		&:last-of-type {
			margin-bottom: 1rem;
		}
	}

	@media (max-width: 42rem) {
	}
</style>
