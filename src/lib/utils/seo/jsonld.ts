export function serializeSchema(schema: Record<string, unknown>) {
	return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}
