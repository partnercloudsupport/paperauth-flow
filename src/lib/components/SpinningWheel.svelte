<script lang="ts">
</script>

<span title="Loading">
	<svg class="loader flex ja--center" viewBox="0 0 100 100">
		<title>Active loading indicator</title>
		<circle class="loader__stroke" cx="50%" cy="50%" r="44" />
	</svg>
</span>

<style lang="scss">
	.loader {
		margin: 0 10px;
		width: 2rem;
		height: 2rem;

		fill: transparent;
	}

	.loader__stroke {
		width: 100%;
		height: 100%;
		transform-origin: center;

		stroke-dasharray: 250;
		stroke-dashoffset: 50;
		stroke-linecap: butt;
		stroke-width: 10;
		stroke: var(--blue-60);

		animation: spin 1.1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dashoffset: 100;
		}
		100% {
			transform: rotate(360deg);
			stroke-dashoffset: 0;
		}
	}
</style>
