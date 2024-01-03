<script lang="ts">
	import { lensClient } from '$src/lib/lensClient';
	import { ExplorePublicationsOrderByType, type PostFragment } from '@lens-protocol/client';
	import { onMount } from 'svelte';

	type MainPageData = {
		streamed: {
			publications: Promise<PostFragment[]>;
		};
	};
	export let data: MainPageData;

	onMount(async () => {
		const publications = lensClient.explore.publications({
			orderBy: ExplorePublicationsOrderByType.Latest
		});
		console.log(publications);
	});

	console.log(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
