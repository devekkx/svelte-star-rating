import { cleanup, render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { afterEach, describe, it, expect } from 'vitest';
import Star from './star.svelte';
import type { StarConfigI } from '../types.js';

const baseConfig: StarConfigI = {
	size: 24,
	filledColor: '#F98416',
	unfilledColor: '#5D5D5D'
};

const INSTANCE = 'test01';

afterEach(() => cleanup());

describe('Star', () => {
	describe('rendering', () => {
		it('renders an SVG element', async () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			const svg = container.querySelector('svg');
			await expect.element(page.elementLocator(svg!)).toBeInTheDocument();
		});

		it('sets width and height from starConfig.size', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			const svg = container.querySelector('svg')!;
			expect(svg.getAttribute('width')).toBe('24');
			expect(svg.getAttribute('height')).toBe('24');
		});

		it('uses filledColor when fillPercent is 1', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			expect(container.querySelector('path')!.getAttribute('fill')).toBe(baseConfig.filledColor);
		});

		it('uses unfilledColor when fillPercent is 0', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0,
				starConfig: baseConfig
			});
			expect(container.querySelector('path')!.getAttribute('fill')).toBe(baseConfig.unfilledColor);
		});

		it('references a linear gradient when fillPercent is between 0 and 1', () => {
			const { container } = render(Star, {
				id: 2,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0.5,
				starConfig: baseConfig
			});
			expect(container.querySelector('path')!.getAttribute('fill')).toBe(`url(#lg-${INSTANCE}-2)`);
		});

		it('renders a linearGradient element for partial fill', () => {
			const { container } = render(Star, {
				id: 3,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0.75,
				starConfig: baseConfig
			});
			const gradient = container.querySelector('linearGradient');
			expect(gradient).not.toBeNull();
			expect(gradient!.getAttribute('id')).toBe(`lg-${INSTANCE}-3`);
		});

		it('does not render defs for a fully filled star', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			expect(container.querySelector('defs')).toBeNull();
		});

		it('does not render defs for an empty star', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0,
				starConfig: baseConfig
			});
			expect(container.querySelector('defs')).toBeNull();
		});

		it('renders three gradient stops for partial fill', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0.6,
				starConfig: baseConfig
			});
			expect(container.querySelectorAll('stop').length).toBe(3);
		});

		it('uses stop-color presentation attributes (not inline style)', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0.5,
				starConfig: baseConfig
			});
			const firstStop = container.querySelector('stop')!;
			// must be a presentation attribute, not an inline style string
			expect(firstStop.getAttribute('stop-color')).toBe(baseConfig.filledColor);
			expect(firstStop.getAttribute('style')).toBeNull();
		});
	});

	describe('opacity', () => {
		it('applies opacity 0.8 in readonly mode', async () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: true,
				fillPercent: 1,
				starConfig: baseConfig
			});
			const g = container.querySelector('g')!;
			await expect.element(page.elementLocator(g)).toHaveAttribute('opacity', '0.8');
		});

		it('applies opacity 1 in interactive mode', async () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			const g = container.querySelector('g')!;
			await expect.element(page.elementLocator(g)).toHaveAttribute('opacity', '1');
		});
	});

	describe('stroke behavior', () => {
		it('defaults stroke to filledColor when strokeColor is not provided', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			expect(container.querySelector('path')!.getAttribute('stroke')).toBe(baseConfig.filledColor);
		});

		it('uses strokeColor when explicitly set', () => {
			const config: StarConfigI = { ...baseConfig, strokeColor: '#000000' };
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: config
			});
			expect(container.querySelector('path')!.getAttribute('stroke')).toBe('#000000');
		});

		it('uses strokeColor on an unfilled star', () => {
			const config: StarConfigI = { ...baseConfig, strokeColor: '#FF0000' };
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0,
				starConfig: config
			});
			expect(container.querySelector('path')!.getAttribute('stroke')).toBe('#FF0000');
		});

		it('falls back to filledColor as stroke on unfilled star when strokeColor is absent', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0,
				starConfig: baseConfig
			});
			expect(container.querySelector('path')!.getAttribute('stroke')).toBe(baseConfig.filledColor);
		});

		it('uses strokeColor on a partially filled star', () => {
			const config: StarConfigI = { ...baseConfig, strokeColor: '#111111' };
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 0.5,
				starConfig: config
			});
			expect(container.querySelector('path')!.getAttribute('stroke')).toBe('#111111');
		});

		it('applies stroke-width', () => {
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: baseConfig
			});
			expect(container.querySelector('path')!.getAttribute('stroke-width')).toBe('10');
		});
	});

	describe('size', () => {
		it('renders at size 16', () => {
			const config: StarConfigI = { ...baseConfig, size: 16 };
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: config
			});
			const svg = container.querySelector('svg')!;
			expect(svg.getAttribute('width')).toBe('16');
			expect(svg.getAttribute('height')).toBe('16');
		});

		it('renders at size 64', () => {
			const config: StarConfigI = { ...baseConfig, size: 64 };
			const { container } = render(Star, {
				id: 0,
				instanceId: INSTANCE,
				readonly: false,
				fillPercent: 1,
				starConfig: config
			});
			const svg = container.querySelector('svg')!;
			expect(svg.getAttribute('width')).toBe('64');
			expect(svg.getAttribute('height')).toBe('64');
		});
	});

	describe('gradient IDs include the instance prefix and star index', () => {
		it('scopes gradient id to instanceId and star index', () => {
			const { container } = render(Star, {
				id: 7,
				instanceId: 'abc',
				readonly: false,
				fillPercent: 0.3,
				starConfig: baseConfig
			});
			expect(container.querySelector('linearGradient')!.getAttribute('id')).toBe('lg-abc-7');
		});

		it('different instanceIds produce different gradient IDs', () => {
			const { container: c1 } = render(Star, {
				id: 0,
				instanceId: 'inst1',
				readonly: false,
				fillPercent: 0.5,
				starConfig: baseConfig
			});
			const id1 = c1.querySelector('linearGradient')!.getAttribute('id');
			cleanup();
			const { container: c2 } = render(Star, {
				id: 0,
				instanceId: 'inst2',
				readonly: false,
				fillPercent: 0.5,
				starConfig: baseConfig
			});
			const id2 = c2.querySelector('linearGradient')!.getAttribute('id');
			expect(id1).toBe('lg-inst1-0');
			expect(id2).toBe('lg-inst2-0');
			expect(id1).not.toBe(id2);
		});
	});
});
