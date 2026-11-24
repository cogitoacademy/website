import { describe, expect, test } from 'bun:test';
import { normalizeBaseUrl } from '../src/lib/constants.ts';

describe('normalizeBaseUrl', () => {
  test('rewrites the apex host to www and keeps the protocol', () => {
    expect(normalizeBaseUrl('https://cogitoacademy.id')).toBe('https://www.cogitoacademy.id');
    expect(normalizeBaseUrl('https://cogitoacademy.id/')).toBe('https://www.cogitoacademy.id');
    expect(normalizeBaseUrl('http://cogitoacademy.id')).toBe('http://www.cogitoacademy.id');
  });

  test('preserves an explicit port', () => {
    expect(normalizeBaseUrl('https://cogitoacademy.id:8443')).toBe(
      'https://www.cogitoacademy.id:8443',
    );
  });

  test('leaves the www host unchanged', () => {
    expect(normalizeBaseUrl('https://www.cogitoacademy.id')).toBe('https://www.cogitoacademy.id');
  });

  test('leaves localhost and Vercel preview hosts alone', () => {
    expect(normalizeBaseUrl('http://localhost:2001')).toBe('http://localhost:2001');
    expect(normalizeBaseUrl('https://cogito-website-git-feat.vercel.app')).toBe(
      'https://cogito-website-git-feat.vercel.app',
    );
  });

  test('falls back to the canonical www URL for empty or invalid values', () => {
    expect(normalizeBaseUrl()).toBe('https://www.cogitoacademy.id');
    expect(normalizeBaseUrl('')).toBe('https://www.cogitoacademy.id');
    expect(normalizeBaseUrl('not a url')).toBe('https://www.cogitoacademy.id');
  });
});
