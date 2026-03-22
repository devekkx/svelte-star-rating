<script lang="ts">
	import type { StarConfigI } from '../types.js';

	let {
		id,
		instanceId,
		readonly,
		fillPercent,
		starConfig
	}: {
		id: number;
		instanceId: string;
		readonly: boolean;
		fillPercent: number;
		starConfig: StarConfigI;
	} = $props();

	const gradientId = `lg-${instanceId}-${id}`;
</script>

<svg
	height={starConfig.size}
	viewBox="-10 -10 220 220"
	width={starConfig.size}
	xmlns="http://www.w3.org/2000/svg"
>
	{#if fillPercent < 1 && fillPercent > 0}
		<defs>
			<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color={starConfig.filledColor} stop-opacity="1" />
				<stop offset="{fillPercent * 100}%" stop-color={starConfig.filledColor} stop-opacity="1" />
				<stop
					offset="{fillPercent * 100}%"
					stop-color={starConfig.unfilledColor}
					stop-opacity="1"
				/>
			</linearGradient>
		</defs>
	{/if}
	<g opacity={readonly ? 0.8 : 1}>
		<path
			d="M 100 10 L 120.2 72.2 L 185.6 72.2 L 132.7 110.6 L 152.9 172.8 L 100 134.4 L 47.1 172.8 L 67.3 110.6 L 14.4 72.2 L 79.8 72.2 Z"
			fill={fillPercent === 1
				? starConfig.filledColor
				: fillPercent === 0
					? starConfig.unfilledColor
					: `url(#${gradientId})`}
			stroke={starConfig.strokeColor ?? starConfig.filledColor}
			stroke-width="10"
			stroke-linejoin="miter"
			stroke-miterlimit="10"
			paint-order="stroke fill"
		/>
	</g>
</svg>
