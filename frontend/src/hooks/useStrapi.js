import { useState, useEffect } from 'react';

/**
 * Generic hook for fetching Strapi data.
 * @param {Function} fetcher – an async function from lib/api
 * @param {Array} deps – dependency array for re-fetching
 */
export default function useStrapi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Strapi fetch error:', err);
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
