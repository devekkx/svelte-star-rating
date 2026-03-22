<script lang="ts">
	import { type ConfigI, StarRating } from '$lib/index.js';

	const config = $state<ConfigI>({
		name: 'stars',
		readonly: false,
		maxVal: 5,
		minVal: 0,
		step: 0.1,
		numOfStars: 5,
		styles: {
			containerStyles:
				'border: 1px solid red; padding: 8px; border-radius: 8px; width:max-content; gap:0rem; margin-inline: auto',
			starStyles: 'gap: 0.1rem'
		},
		starConfig: {
			size: 26,
			filledColor: '#F98416',
			unfilledColor: '#FFFFFF',
			strokeColor: '#F98416'
		}
	});

	let value = $state(4.4);
</script>

<main>
	<StarRating bind:value {config} />
</main>
