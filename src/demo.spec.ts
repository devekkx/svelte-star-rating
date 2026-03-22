import { describe, it, expect } from 'vitest';

// Sanity check that the test environment is working correctly.
describe('test environment', () => {
	it('runs basic arithmetic', () => {
		expect(1 + 2).toBe(3);
	});

	it('handles floating point correctly', () => {
		expect(0.1 + 0.2).toBeCloseTo(0.3);
	});
});
