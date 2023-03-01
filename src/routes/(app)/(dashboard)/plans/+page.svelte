<script lang="ts">
	import { Button } from 'lib/components/_index';
	import { api } from 'lib/utils/pages';

	type plan = {
		name: string;
		price: number;
		interval: string;
		lookup_key: string;
		description?: string;
	};

	let plans: plan[] = [
		{
			lookup_key: 'starter-plan',
			price: 9.99,
			interval: 'month',
			name: 'Starter plan',
			description: 'Access all the features!'
		}
	];

	async function checkout(lookupKey: string) {
		console.log(lookupKey);
		await fetch(api.createCheckout, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				lookupKey: lookupKey
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
	<h2 class="head-component-1">You are in <span class="type-italic">Test mode</span></h2>
	<p class="type-utility-1">Plans are not available for purchase</p>
	<div class="products grid a--center">
		{#each plans as plan, i}
			<div class="product column j--sb col-span-2">
				<div class="product__details column">
					<h2>{plan.name}</h2>
					<p class="product__price row">
						<span class="head-layout-2">${plan.price}</span>
						<span class="product__price-interval type-utility-1">/{plan.interval}</span>
					</p>
					<p class="type-body-1">{plan.description ?? ''}</p>
				</div>
				<Button
					>{plan.interval.slice(0, 1).toUpperCase() + plan.interval.slice(1)}ly payments</Button
				>
			</div>
		{/each}
		<div class="product column j--sb col-span-2">
			<div class="product__details column">
				<h2>Enterprise plan</h2>
				<p class="product__price row">
					<span class="head-layout-2">$11.99</span>
					<span class="product__price-interval type-utility-1">/user/month</span>
				</p>
				<p class="type-body-1">
					Skyrocket the speed at which your teams get the paperwork done by providing them access to
					the fastest eSignature solution.
				</p>
			</div>
			<Button buttonStyle="tertiary">Contact sales</Button>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		row-gap: 2rem;
	}

	.products {
		gap: 1rem;
	}

	.product {
		height: 100%;
		row-gap: 2rem;
		padding: 1rem;

		border: 1px solid var(--grey-30);
	}

	.product__details {
		row-gap: 1rem;
	}

	.product__price-interval {
		padding-top: 0.5rem;
		padding-left: 0.25rem;
	}

	@media (max-width: 66rem) {
		.product {
			grid-column: span 6;
		}
	}
</style>
