import { cleanup, render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { afterEach, describe, it, expect } from 'vitest';
import StarRating from './star-rating.svelte';
import type { ConfigI } from '../types.js';

const baseConfig: ConfigI = {
	readonly: false,
	numOfStars: 5,
	minVal: 0,
	maxVal: 5,
	step: 0.5,
	starConfig: {
		size: 24,
		filledColor: '#F98416',
		unfilledColor: '#5D5D5D'
	}
};

afterEach(() => cleanup());

describe('StarRating', () => {
	describe('rendering', () => {
		it('renders the correct number of stars', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			const starsRow = container.querySelector('.stars')!;
			expect(starsRow.childElementCount).toBe(5);
		});

		it('renders 10 stars for a 10-star config', () => {
			const config: ConfigI = { ...baseConfig, numOfStars: 10, maxVal: 10 };
			const { container } = render(StarRating, { config, value: 7 });
			const starsRow = container.querySelector('.stars')!;
			expect(starsRow.childElementCount).toBe(10);
		});

		it('renders a hidden range input', async () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			const input = container.querySelector('input[type="range"]');
			await expect.element(page.elementLocator(input!)).toBeInTheDocument();
		});

		it('renders a section container', async () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			const section = container.querySelector('section');
			await expect.element(page.elementLocator(section!)).toBeInTheDocument();
		});
	});

	describe('range input attributes', () => {
		it('sets min and max from config', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			const input = container.querySelector('input[type="range"]')!;
			expect(input.getAttribute('min')).toBe('0');
			expect(input.getAttribute('max')).toBe('5');
		});

		it('sets step from config', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			const input = container.querySelector('input[type="range"]')!;
			expect(input.getAttribute('step')).toBe('0.5');
		});

		it('uses default name "stars" when name is not provided', async () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			const input = container.querySelector('input[name="stars"]');
			await expect.element(page.elementLocator(input!)).toBeInTheDocument();
		});

		it('uses the custom name when provided', async () => {
			const config: ConfigI = { ...baseConfig, name: 'productRating' };
			const { container } = render(StarRating, { config, value: 3 });
			const input = container.querySelector('input[name="productRating"]');
			await expect.element(page.elementLocator(input!)).toBeInTheDocument();
		});
	});

	describe('readonly mode', () => {
		it('locks slider min and max to current value', () => {
			const config: ConfigI = { ...baseConfig, readonly: true };
			const { container } = render(StarRating, { config, value: 2.5 });
			const input = container.querySelector('input[type="range"]')!;
			expect(input.getAttribute('min')).toBe('2.5');
			expect(input.getAttribute('max')).toBe('2.5');
		});

		it('does not lock slider when readonly is false', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 2.5 });
			const input = container.querySelector('input[type="range"]')!;
			expect(input.getAttribute('min')).toBe('0');
			expect(input.getAttribute('max')).toBe('5');
		});
	});

	describe('star fill logic', () => {
		it('renders all stars fully filled when value equals numOfStars', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 5 });
			container.querySelectorAll('path').forEach((path) => {
				expect(path.getAttribute('fill')).toBe(baseConfig.starConfig.filledColor);
			});
		});

		it('renders all stars empty when value is 0', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 0 });
			container.querySelectorAll('path').forEach((path) => {
				expect(path.getAttribute('fill')).toBe(baseConfig.starConfig.unfilledColor);
			});
		});

		it('renders a gradient for the partial star in a fractional value', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 2.5 });
			expect(container.querySelector('linearGradient')).not.toBeNull();
		});

		it('renders exactly one gradient for a single fractional star', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 1.7 });
			expect(container.querySelectorAll('linearGradient').length).toBe(1);
		});
	});

	describe('strokeColor propagation', () => {
		it('passes strokeColor to all stars', () => {
			const config: ConfigI = {
				...baseConfig,
				starConfig: { ...baseConfig.starConfig, strokeColor: '#123456' }
			};
			const { container } = render(StarRating, { config, value: 3 });
			container.querySelectorAll('path').forEach((path) => {
				expect(path.getAttribute('stroke')).toBe('#123456');
			});
		});

		it('defaults stroke to filledColor on all stars when strokeColor is absent', () => {
			const { container } = render(StarRating, { config: baseConfig, value: 3 });
			container.querySelectorAll('path').forEach((path) => {
				expect(path.getAttribute('stroke')).toBe(baseConfig.starConfig.filledColor);
			});
		});
	});

	describe('custom styles', () => {
		it('applies containerStyles to the section element', () => {
			const config: ConfigI = {
				...baseConfig,
				styles: { containerStyles: 'padding: 8px;' }
			};
			const { container } = render(StarRating, { config, value: 3 });
			expect(container.querySelector('section')!.getAttribute('style')).toBe('padding: 8px;');
		});

		it('applies starStyles to the stars row', () => {
			const config: ConfigI = {
				...baseConfig,
				styles: { starStyles: 'gap: 0.5rem;' }
			};
			const { container } = render(StarRating, { config, value: 3 });
			const starsRow = container.querySelector('.stars') as HTMLElement;
			expect(starsRow.getAttribute('style')).toBe('gap: 0.5rem;');
		});
	});
});
