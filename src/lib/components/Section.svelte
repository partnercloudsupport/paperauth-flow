<script lang="ts">
	export let sectionColor: 'primary' | 'secondary' = 'primary';
</script>

<section class="background--{sectionColor}">
	<div class="section__inner  b--center">
		<slot />
	</div>
</section>

<style lang="scss">
	.background--primary {
		background-color: var(--grey-0);
	}
	.background--secondary {
		background-color: var(--grey-10);
	}

	.section__inner {
		padding: 0 2rem;
		max-width: var(--max-document-width);
		height: 100%;
	}

	@media (max-width: 42rem) {
		.section__inner {
			padding: 0 1rem;
		}
	}
</style>
