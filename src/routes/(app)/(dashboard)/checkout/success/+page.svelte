<script lang="ts">
	import { Button } from 'lib/components/_index';
	import { pages } from 'lib/utils/pages';
</script>

<div class="wrapper">
	<h3>Subscription activated</h3>

	<form action={pages.checkout} method="post">
		<input type="hidden" name="lookup_key" value="starter-plan" />
		<Button buttonType="submit">Subscribe</Button>
	</form>
</div>

<style lang="scss">
</style>
