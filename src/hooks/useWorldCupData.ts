"use client";

import { useCallback, useEffect, useState } from "react";
import type { WorldCupPayload } from "@/lib/world-cup-api";

const LIVE_POLL_MS = 15_000;
const DEFAULT_POLL_MS = 60_000;

async function fetchWorldCupData(): Promise<WorldCupPayload> {
  const response = await fetch("/api/world-cup", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not load live scores.");
  }

  return response.json() as Promise<WorldCupPayload>;
}

export function useWorldCupData() {
  const [data, setData] = useState<WorldCupPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const payload = await fetchWorldCupData();
      setData(payload);
      setError(null);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Could not load live scores.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function sync() {
      try {
        const payload = await fetchWorldCupData();
        if (cancelled) {
          return;
        }
        setData(payload);
        setError(null);
      } catch (fetchError) {
        if (cancelled) {
          return;
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Could not load live scores.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void sync();

    const interval = window.setInterval(() => {
      void sync();
    }, data?.live.length ? LIVE_POLL_MS : DEFAULT_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [data?.live.length]);

  return {
    data,
    loading,
    error,
    refresh,
  };
}
