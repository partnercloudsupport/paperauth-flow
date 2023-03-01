<script lang="ts">
	import { page } from '$app/stores';
	import { serializeSchema } from 'lib/utils/seo/jsonld';

	export let title = 'The Hunt';
	export let description = 'Join The Hunt and its community in a thrilling world of chaos!';
	export let type = 'WebPage';

	let url = $page.url;
	if (url.pathname === '/' || url.pathname === '') type = 'WebSite';

	const schema = {
		'@context': 'https://schema.org',
		'@type': type,
		name: title,
		description: description,
		url: url.href
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	{@html serializeSchema(schema)}
</svelte:head>
