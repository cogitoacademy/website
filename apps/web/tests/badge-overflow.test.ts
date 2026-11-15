import { expect, test } from 'bun:test';
import { fitBadgeCount } from '../src/lib/badge-overflow';

test('fits a single row using badge widths and reserves the actual counter width', () => {
  expect(fitBadgeCount([40, 80, 50], [25, 25, 25], 186, 8)).toBe(3);
  expect(fitBadgeCount([40, 80, 50], [25, 25, 25], 161, 8)).toBe(2);
  expect(fitBadgeCount([40, 80, 50], [25, 25, 25], 160, 8)).toBe(1);
  expect(fitBadgeCount([200, 20], [25, 25], 100, 8)).toBe(0);
  expect(fitBadgeCount([], [], 100, 8)).toBe(0);
});
