import { getStore } from '@netlify/blobs';

// On-demand, called by the page's client-side script. No schedule, no
// Circle token involved: it only ever reads the cache that
// update-member-count.mts writes once a day.
export default async () => {
  try {
    const store = getStore('member-count');
    const cached = await store.get('count', { type: 'json' });
    const count = typeof cached?.count === 'number' ? cached.count : null;

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300',
      },
    });
  } catch (err) {
    console.error('member-count: failed to read cache', err);
    return new Response(JSON.stringify({ count: null }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
};
