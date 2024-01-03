<script lang="ts">
	import type { PostFragment } from '@lens-protocol/client';

	type MainPageData = {
		streamed: {
			publications: Promise<PostFragment[]>;
		};
	};
	export let data: MainPageData;

	console.log(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
