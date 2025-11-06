import { useState, useEffect } from "react";
import { apiFetch } from "./api";

export function useFetch<T>(url: string, key: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cached = localStorage.getItem(key);
      if (cached) setData(JSON.parse(cached));

      try {
        const res = await apiFetch(url);
        setData(res);
        localStorage.setItem(key, JSON.stringify(res));
      } catch (err) {
        console.error(`Failed to fetch ${key}`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading };
}
