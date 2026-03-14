import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  useCdn: true, // Set to false for development to get fresh data
  perspective: 'published', // Only fetch published documents
  token: process.env.SANITY_API_TOKEN, // Optional: for authenticated requests
});
