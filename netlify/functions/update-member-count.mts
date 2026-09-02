import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

// Runs once a day. Fetches the live member count from Circle and caches it
// in Netlify Blobs. Never called from the browser, never triggers a site
// rebuild. See netlify/functions/member-count.mts for the read side.
export default async () => {
  const token = process.env.CIRCLE_API_TOKEN;

  if (!token) {
    console.error('update-member-count: CIRCLE_API_TOKEN is not set');
    return new Response('Missing CIRCLE_API_TOKEN', { status: 500 });
  }

  try {
    const res = await fetch(
      'https://app.circle.so/api/v2/community_members?status=all&per_page=1',
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!res.ok) {
      console.error(`update-member-count: Circle API returned ${res.status}`);
      return new Response('Circle API error', { status: 502 });
    }

    const data = await res.json();
    const count = data?.count;

    if (typeof count !== 'number' || count <= 0) {
      console.error('update-member-count: unexpected Circle API payload', data);
      return new Response('Unexpected Circle API payload', { status: 502 });
    }

    const store = getStore('member-count');
    await store.setJSON('count', { count, updatedAt: new Date().toISOString() });

    console.log(`update-member-count: cached count ${count}`);
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('update-member-count: failed', err);
    return new Response('Error', { status: 500 });
  }
};

export const config: Config = {
  schedule: '@daily',
};
