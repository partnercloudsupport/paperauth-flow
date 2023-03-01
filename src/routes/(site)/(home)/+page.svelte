<script lang="ts">
	import { Section, Seo } from 'lib/components/_index';
	import { Hero } from './sections/_index';

	$: scrollY = 0;

	let sectionsHeight: number[] = [];
</script>

<Seo title="PaperAuth | Home" description="World's safest eSignature solution" />

<svelte:window bind:scrollY />
<div bind:clientHeight={sectionsHeight[0]}>
	<Section sectionColor="secondary">
		<Hero />
	</Section>
</div>
