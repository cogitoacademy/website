import 'server-only';

import { unstable_cache } from 'next/cache';
import type { ApprovedAchievement } from '@/types/achievement';

const DEFAULT_API_URL = 'https://api.cogitoacademy.id';
const CACHE_SECONDS = 120;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function asNullableString(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function normalizeAchievement(value: unknown): ApprovedAchievement | null {
  if (!isRecord(value)) return null;

  const requiredFields = ['id', 'eventName', 'category', 'award', 'level', 'displayName'];
  if (requiredFields.some((field) => typeof value[field] !== 'string')) return null;

  const subjects = Array.isArray(value.subjects)
    ? value.subjects.filter((subject): subject is string => typeof subject === 'string')
    : [];

  return {
    id: value.id as string,
    eventName: value.eventName as string,
    category: value.category as string,
    award: value.award as string,
    level: value.level as string,
    issuer: asNullableString(value.issuer),
    awardingDate: asNullableString(value.awardingDate),
    location: asNullableString(value.location),
    description: asNullableString(value.description),
    subjects,
    documentationUrl: asNullableString(value.documentationUrl),
    createdAt: asNullableString(value.createdAt),
    displayName: value.displayName as string,
  };
}

async function fetchApprovedAchievements(): Promise<ApprovedAchievement[]> {
  const apiUrl = process.env.COGITO_APP_API_URL || DEFAULT_API_URL;
  const endpoint = `${apiUrl.replace(/\/$/, '')}/rpc/achievement/listApproved`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ json: {} }),
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Approved achievements request failed with ${response.status}`);
  }

  const payload: unknown = await response.json();
  const data = isRecord(payload) && 'json' in payload ? payload.json : payload;
  const rawItems = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.items)
      ? data.items
      : [];

  return rawItems
    .map(normalizeAchievement)
    .filter((item): item is ApprovedAchievement => item !== null);
}

export const getApprovedAchievements = unstable_cache(
  fetchApprovedAchievements,
  ['public-approved-achievements'],
  { revalidate: CACHE_SECONDS, tags: ['public-approved-achievements'] },
);
