# Svelte Star Rating

A simple, zero-dependency star rating component for Svelte 5. It supports partial fills, full keyboard and mouse interaction, a readonly display mode, and per-instance customization of colors, size, and stroke.

## Installation

Install the package with your preferred package manager:

```bash
npm install @dev-ekkx/svelte-star-rating
# or
pnpm add @dev-ekkx/svelte-star-rating
# or
bun add @dev-ekkx/svelte-star-rating
```

This package requires Svelte 5 as a peer dependency.

## Quick start

Here is a basic interactive rating input:

```svelte
<script lang="ts">
 import { StarRating } from '@dev-ekkx/svelte-star-rating';

 let value = $state(4.4);

 const config = {
  readonly: false,
  maxVal: 5,
  minVal: 0,
  step: 0.1,
  numOfStars: 5,
  starConfig: {
   size: 26,
   filledColor: '#F98416',
   unfilledColor: '#5D5D5D'
  }
 };
</script>

<StarRating bind:value {config} /><p>Current rating: {value}</p>
```

And here is a read-only display, useful for showing an existing score:

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
  starConfig: {
   size: 20,
   filledColor: '#ffc107',
   unfilledColor: '#e0e0e0'
  }
 };
</script>

<StarRating {config} bind:value />
```

When `readonly` is true, the slider is disabled and the displayed rating cannot be changed by the user.

## API

### Component: StarRating

| Prop   | Type    | Required | Default | Description                                                 |
| ------ | ------- | -------- | ------- | ----------------------------------------------------------- |
| config | ConfigI | Yes      | -       | Controls behavior and appearance                            |
| value  | number  | No       | 4.54    | The current rating. Use `bind:value` to read and update it. |

### Types

```ts
export interface StarConfigI {
 size: number; // Pixel size of each star SVG
 filledColor: string; // Fill color for filled stars
 unfilledColor: string; // Fill color for unfilled stars
 strokeColor?: string; // Outline color for each star. Defaults to filledColor when not set.
}

export interface ConfigI {
 name?: string; // Name attribute on the hidden range input. Defaults to "stars".
 readonly: boolean; // When true, the rating cannot be changed by the user.
 numOfStars: number; // How many stars to render.
 minVal: number; // Minimum selectable value.
 maxVal: number; // Maximum selectable value.
 step: number; // Granularity of the rating (e.g. 0.5 for half-stars, 1 for whole stars).
 starConfig: StarConfigI;
 styles?: {
  containerStyles?: string; // Inline CSS for the outer container element.
  starStyles?: string; // Inline CSS for the row of stars (useful for controlling gap).
 };
}
```

## Stroke color

Each star has an outline that you can control with `strokeColor` inside `starConfig`. If you do not set it, the outline defaults to the same color as `filledColor`, making it visible on unfilled stars but seamless on filled ones.

A darker shade of your fill color is a common choice for the stroke:

```ts
starConfig: {
  size: 26,
  filledColor: '#F98416',
  unfilledColor: '#5D5D5D',
  strokeColor: '#C8690F'  // a darker orange outline
}
```

Or use a completely different color to create a distinct border effect:

```ts
starConfig: {
  size: 26,
  filledColor: '#ffd700',
  unfilledColor: '#e0e0e0',
  strokeColor: '#999999'
}
```

## Partial fill

The `value` prop can be fractional. Stars at indices below `Math.floor(value)` are fully filled. The star at index `Math.floor(value)` is partially filled to show the fractional part. Stars beyond that are empty.

For example, with `value = 3.7` and 5 stars:

- Stars 1, 2, 3 are fully filled
- Star 4 is 70% filled
- Star 5 is empty

The `step` field controls how finely the user can adjust the rating. Use `step: 1` for whole stars, `step: 0.5` for half stars, or `step: 0.1` for tenth-star precision.

## Styling and customization

The component uses inline SVG fills, so star colors work without any external CSS.

To control layout and spacing, pass a `styles` object:

- `containerStyles` is applied to the outer section wrapper. Use it to set margins, borders, padding, width, and alignment.
- `starStyles` is applied to the row that holds the stars. Use it to control the gap between stars.

Example:

```svelte
<script lang="ts">
 import { StarRating, type ConfigI } from '@dev-ekkx/svelte-star-rating';

 let value = $state(4.4);

 const config: ConfigI = {
  readonly: false,
  maxVal: 5,
  minVal: 0,
  step: 0.1,
  numOfStars: 5,
  styles: {
   containerStyles:
    'border: 1px solid #ddd; padding: 8px; border-radius: 8px; width: max-content;',
   starStyles: 'gap: 0.2rem;'
  },
  starConfig: {
   size: 26,
   filledColor: '#F98416',
   unfilledColor: '#5D5D5D',
   strokeColor: '#C8690F'
  }
 };
</script>

<StarRating bind:value {config} />
```

## More examples

Five stars, whole-number steps:

```svelte
<script lang="ts">
 import { StarRating } from '@dev-ekkx/svelte-star-rating';

 let value = $state(0);

 const config = {
  readonly: false,
  minVal: 0,
  maxVal: 5,
  step: 1,
  numOfStars: 5,
  starConfig: { size: 32, filledColor: 'gold', unfilledColor: '#ccc' }
 };
</script>

<StarRating bind:value {config} /><p>Your rating: {value}</p>
```

Ten stars, quarter-step precision:

```svelte
<script lang="ts">
 import { StarRating } from '@dev-ekkx/svelte-star-rating';

 let value = $state(7.5);

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

## Accessibility

When `readonly` is false, the underlying range input is keyboard-focusable and operable with arrow keys. Consider adding a visible label or `aria-label` attribute in your application to describe what the rating is for.

## Notes

The component is exported as a named export:

```ts
import { StarRating } from '@dev-ekkx/svelte-star-rating';
// types are also available
import type { ConfigI, StarConfigI } from '@dev-ekkx/svelte-star-rating';
```

It requires Svelte 5. It renders correctly in server-side rendering environments since it is purely presentational. The range input interaction is client-only.

## License

MIT License. Copyright 2025 Emmanuel Komla Kpendo.
