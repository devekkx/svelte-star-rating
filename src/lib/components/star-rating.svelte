<script lang="ts">
	import type { ConfigI } from '../types.js';
	import Star from './star.svelte';

	let { config, value = $bindable(4.54) }: { config: ConfigI; value: number } = $props();

	// Unique prefix per component instance to prevent linearGradient ID collisions
	// when multiple StarRating components exist on the same page.
	const instanceId = Math.random().toString(36).slice(2, 9);

	// Clamp numOfStars to a safe range to prevent denial-of-service from extreme values.
	const numOfStars = Math.min(Math.max(Math.floor(config.numOfStars), 1), 100);
</script>

<section class="container" style={config?.styles?.containerStyles ?? ''}>
	<div class="range-stars">
		<div class="stars" style={config?.styles?.starStyles ?? ''}>
			{#each Array(numOfStars) as _item, idx (_item || idx)}
				{#if Math.floor(value) === idx}
					<Star
						id={idx}
						{instanceId}
						readonly={config.readonly}
						starConfig={config.starConfig}
						fillPercent={value - Math.floor(value)}
					/>
				{:else if value > idx}
					<Star
						id={idx}
						{instanceId}
						readonly={config.readonly}
						starConfig={config.starConfig}
						fillPercent={1}
					/>
				{:else}
					<Star
						id={idx}
						{instanceId}
						readonly={config.readonly}
						starConfig={config.starConfig}
						fillPercent={0}
					/>
				{/if}
			{/each}
		</div>

		<!--Star trigger-->
		<input
			bind:value
			class="slider"
			max={config.readonly ? value : config.maxVal}
			min={config.readonly ? value : config.minVal}
			name={config.name ?? 'stars'}
			step={config.step}
			type="range"
		/>
	</div>
</section>

<style>
	.container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.range-stars {
		position: relative;
	}

	.stars {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.slider {
		opacity: 0;
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
</style>
