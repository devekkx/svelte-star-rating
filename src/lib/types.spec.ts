import { describe, it, expect } from 'vitest';
import type { ConfigI, StarConfigI } from './types.js';

describe('StarConfigI', () => {
	it('accepts size, filledColor, and unfilledColor', () => {
		const config: StarConfigI = {
			size: 24,
			filledColor: '#F98416',
			unfilledColor: '#5D5D5D'
		};
		expect(config.size).toBe(24);
		expect(config.filledColor).toBe('#F98416');
		expect(config.unfilledColor).toBe('#5D5D5D');
	});

	it('accepts an optional strokeColor', () => {
		const config: StarConfigI = {
			size: 24,
			filledColor: '#F98416',
			unfilledColor: '#5D5D5D',
			strokeColor: '#000000'
		};
		expect(config.strokeColor).toBe('#000000');
	});

	it('strokeColor is undefined when not provided', () => {
		const config: StarConfigI = {
			size: 24,
			filledColor: '#F98416',
			unfilledColor: '#5D5D5D'
		};
		expect(config.strokeColor).toBeUndefined();
	});

	it('strokeColor can be any valid CSS color string', () => {
		const withHsl: StarConfigI = {
			size: 24,
			filledColor: '#fff',
			unfilledColor: '#000',
			strokeColor: 'hsl(200, 100%, 50%)'
		};
		const withRgb: StarConfigI = {
			size: 24,
			filledColor: '#fff',
			unfilledColor: '#000',
			strokeColor: 'rgb(255, 0, 0)'
		};
		const withNamed: StarConfigI = {
			size: 24,
			filledColor: '#fff',
			unfilledColor: '#000',
			strokeColor: 'gold'
		};
		expect(withHsl.strokeColor).toBe('hsl(200, 100%, 50%)');
		expect(withRgb.strokeColor).toBe('rgb(255, 0, 0)');
		expect(withNamed.strokeColor).toBe('gold');
	});
});

describe('ConfigI', () => {
	it('accepts all required fields', () => {
		const config: ConfigI = {
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
		expect(config.readonly).toBe(false);
		expect(config.numOfStars).toBe(5);
		expect(config.minVal).toBe(0);
		expect(config.maxVal).toBe(5);
		expect(config.step).toBe(0.5);
	});

	it('name is optional and defaults to undefined when omitted', () => {
		const config: ConfigI = {
			readonly: false,
			numOfStars: 5,
			minVal: 0,
			maxVal: 5,
			step: 0.5,
			starConfig: { size: 24, filledColor: '#fff', unfilledColor: '#000' }
		};
		expect(config.name).toBeUndefined();
	});

	it('accepts a name string', () => {
		const config: ConfigI = {
			name: 'productRating',
			readonly: false,
			numOfStars: 5,
			minVal: 0,
			maxVal: 5,
			step: 1,
			starConfig: { size: 24, filledColor: '#fff', unfilledColor: '#000' }
		};
		expect(config.name).toBe('productRating');
	});

	it('styles is optional', () => {
		const config: ConfigI = {
			readonly: false,
			numOfStars: 5,
			minVal: 0,
			maxVal: 5,
			step: 1,
			starConfig: { size: 24, filledColor: '#fff', unfilledColor: '#000' }
		};
		expect(config.styles).toBeUndefined();
	});

	it('accepts styles with containerStyles and starStyles', () => {
		const config: ConfigI = {
			readonly: false,
			numOfStars: 5,
			minVal: 0,
			maxVal: 5,
			step: 1,
			starConfig: { size: 24, filledColor: '#fff', unfilledColor: '#000' },
			styles: {
				containerStyles: 'padding: 8px;',
				starStyles: 'gap: 0.2rem;'
			}
		};
		expect(config.styles?.containerStyles).toBe('padding: 8px;');
		expect(config.styles?.starStyles).toBe('gap: 0.2rem;');
	});

	it('accepts readonly: true', () => {
		const config: ConfigI = {
			readonly: true,
			numOfStars: 5,
			minVal: 0,
			maxVal: 5,
			step: 1,
			starConfig: { size: 24, filledColor: '#fff', unfilledColor: '#000' }
		};
		expect(config.readonly).toBe(true);
	});

	it('passes strokeColor through starConfig', () => {
		const config: ConfigI = {
			readonly: false,
			numOfStars: 5,
			minVal: 0,
			maxVal: 5,
			step: 1,
			starConfig: {
				size: 24,
				filledColor: '#F98416',
				unfilledColor: '#5D5D5D',
				strokeColor: '#CC6600'
			}
		};
		expect(config.starConfig.strokeColor).toBe('#CC6600');
	});
});

describe('fill percent logic', () => {
	// These tests verify the math used by StarRating to compute fillPercent per star
	it('star at index below floor(value) is fully filled', () => {
		const value = 3.7;
		const idx = 2;
		const fillPercent = value > idx ? 1 : 0;
		expect(fillPercent).toBe(1);
	});

	it('star at index equal to floor(value) is partially filled', () => {
		const value = 3.7;
		const idx = 3;
		const isPartial = Math.floor(value) === idx;
		const fillPercent = isPartial ? value - Math.floor(value) : 0;
		expect(isPartial).toBe(true);
		expect(fillPercent).toBeCloseTo(0.7);
	});

	it('star at index above value is empty', () => {
		const value = 3.7;
		const idx = 4;
		const fillPercent = value > idx ? 1 : 0;
		expect(fillPercent).toBe(0);
	});

	it('integer value fills exactly that many stars', () => {
		const value = 3;
		const results = [0, 1, 2, 3, 4].map((idx) => {
			if (Math.floor(value) === idx) return value - Math.floor(value);
			if (value > idx) return 1;
			return 0;
		});
		expect(results).toEqual([1, 1, 1, 0, 0]);
	});

	it('value of 0 leaves all stars empty', () => {
		const value = 0;
		const results = [0, 1, 2, 3, 4].map((idx) => {
			if (Math.floor(value) === idx) return value - Math.floor(value);
			if (value > idx) return 1;
			return 0;
		});
		expect(results).toEqual([0, 0, 0, 0, 0]);
	});

	it('max value fills all stars', () => {
		const value = 5;
		const results = [0, 1, 2, 3, 4].map((idx) => {
			if (Math.floor(value) === idx) return value - Math.floor(value);
			if (value > idx) return 1;
			return 0;
		});
		expect(results).toEqual([1, 1, 1, 1, 1]);
	});
});
