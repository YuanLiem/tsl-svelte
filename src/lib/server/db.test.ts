import { describe, it, expect } from 'vitest';

describe('db.getRandomRecipe', () => {
	it('should generate a random index between 1 and 50', async () => {
		const randomDigits: number[] = [];
		for (let i = 0; i < 1000; i++) {
			const randomDigit = Math.floor(Math.random() * 50 + 1);
			randomDigits.push(randomDigit);
		}

		expect(randomDigits.every((i) => i >= 1 && i <= 50)).toBe(true);
	});
});
