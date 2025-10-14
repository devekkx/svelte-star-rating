# Svelte Star Rating

Simple, zero-dependency star rating component for Svelte.

- Tiny and framework-native (Svelte 5)
- Fully controlled with bind:value
- Half/partial star fill supported (any step you want)
- Customizable size and colors
- Optional readonly mode

## Installation

Using your preferred package manager:

- npm: `npm i @dev-ekkx/svelte-star-rating`
- pnpm: `pnpm add @dev-ekkx/svelte-star-rating`
- bun: `bun add @dev-ekkx/svelte-star-rating`

Peer dependency:

- svelte ^5.39.6

## Quick start

1) Import the component

```svelte
<script lang="ts">
  import { StarRating } from '@dev-ekkx/svelte-star-rating';
  import type { ConfigI } from '@dev-ekkx/svelte-star-rating/dist/lib/types';

  // Current rating value (number). You can bind and update it.
  let value = 4.4;

  // Component config
  const config: ConfigI = {
    readonly: false,
    maxVal: 5,
    minVal: 0,
    step: 0.1, // allows tenth-star granularity
    numOfStars: 5,
    starConfig: {
      size: 26, // pixels
      filledColor: '#F98416',
      unfilledColor: '#5D5D5D'
    }
  };
</script>

<StarRating bind:value {config} />
```

2) Read-only display

```svelte
<script lang="ts">
  import { StarRating } from '@dev-ekkx/svelte-star-rating';
  let value = 3.7;
  const config = {
    readonly: true,
    minVal: 0,
    maxVal: 5,
    step: 0.1,
    numOfStars: 5,
    starConfig: { size: 20, filledColor: '#ffc107', unfilledColor: '#e0e0e0' }
  };
</script>

<StarRating {config} bind:value />
```

Note: when readonly is true, the slider is disabled and the current value is preserved.

## API

Component: StarRating

- Props
    - config: ConfigI (required)
    - bind:value: number (optional; default 4.54 inside component). If you bind to a variable, it becomes a controlled
      component and updates as the user interacts.

Types:

```ts
export interface StarConfigI {
    size: number;
    filledColor: string;
    unfilledColor: string;
}

export interface ConfigI {
    readonly: boolean;
    numOfStars: number;
    minVal: number;
    maxVal: number;
    step: number;
    starConfig: StarConfigI;
}
```

Behavior notes:

- The component renders numOfStars SVG stars.
- value may be fractional. Stars will be fully filled for indices below floor(value), and the next star will be
  partially filled to match the fraction. Remaining stars are unfilled.
- The HTML input[type="range"] is visually hidden but handles keyboard/mouse/touch interaction when readonly is false.
- The slider range is clamped to [minVal, maxVal] with the provided step.

Accessibility:

- The interactive slider is focusable and operable via keyboard when readonly is false.
- Consider adding surrounding labels or aria attributes in your app if needed.

## Styling and customization

Use starConfig to control visuals per instance:

- size: pixel size of each star SVG
- filledColor: color for the filled portion
- unfilledColor: color for the unfilled portion

Because the component uses inline SVG, colors apply directly and do not require external CSS.

## Examples

- Five stars, integer steps only:

```svelte
<script>
  import { StarRating } from '@dev-ekkx/svelte-star-rating';
  let value = 0;
  const config = {
    readonly: false,
    minVal: 0,
    maxVal: 5,
    step: 1,
    numOfStars: 5,
    starConfig: { size: 32, filledColor: 'gold', unfilledColor: '#ccc' }
  };
</script>

<StarRating bind:value {config} />
<p>Your rating: {value}</p>
```

- Ten stars, quarter steps:

```svelte
<script>
  import { StarRating } from '@dev-ekkx/svelte-star-rating';
  let value = 7.5;
  const config = {
    readonly: false,
    minVal: 0,
    maxVal: 10,
    step: 0.25,
    numOfStars: 10,
    starConfig: { size: 18, filledColor: '#4f46e5', unfilledColor: '#e5e7eb' }
  };
</script>

<StarRating bind:value {config} />
```

[//]: # (## Development)

[//]: # ()

[//]: # (Run the demo app locally:)

[//]: # (- Dev server: `npm run dev`)

[//]: # (- Type-check: `npm run check`)

[//]: # (- Build library + types: `npm run build`)

[//]: # (- Preview build: `npm run preview`)

[//]: # ()

[//]: # (The distributable files are emitted to dist/.)

## Notes

- This package uses named export:
  ```ts
  import { StarRating } from '@dev-ekkx/svelte-star-rating';
  ```
- Requires Svelte 5 (uses $bindable/$state in the demo and bind:value in the component).
- Works in SSR environments as it is purely presentational and eventless, but interaction (range input) is client-only.