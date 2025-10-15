// hooks/useStarships.ts (or .js)
import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

// --- helpers ---------------------------------------------------------------

function isUrl(input: unknown) {
  return typeof input === "string" && /^https?:\/\//i.test(input);
}

function getIdFromUrl(url: string) {
  const m = url.match(/starships\/(\d+)\/?$/);
  return m ? m[1] : null;
}

function normalizeInput(input: any) {
  if (input === null || input === undefined) return { key: "" };
  const s = String(input).trim();
  if (!s) return { key: "" };

  if (isUrl(s)) {
    return { key: s, url: s, id: getIdFromUrl(s) || undefined };
  }
  return { key: s, id: s };
}

// --- fetchers --------------------------------------------------------------

async function fetchStarship(info: { url?: string; id?: string }) {
  if (info?.url) {
    const { data } = await axios.get(info.url);
    return data;
  }
  if (info?.id) {
    const { data } = await axios.get(
      `https://swapi.dev/api/starships/${info.id}/`
    );
    return data;
  }
  throw new Error("No starship identifier provided");
}

async function fetchStarshipsPage(page = 1, q = "") {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q.trim()) params.set("search", q.trim());

  const { data } = await axios.get(
    `https://swapi.dev/api/starships/?${params}`
  );
  // -> { count, next, previous, results }
  return data;
}

// --- hooks -----------------------------------------------------------------

// Single starship by id or URL
export function useStarship(starshipIdOrUrl?: string) {
  const info = normalizeInput(starshipIdOrUrl);
  const enabled = info.key !== "";

  return useQuery({
    queryKey: ["starship", info.key],
    queryFn: () => fetchStarship(info),
    enabled,
    staleTime: 60_000,
  });
}

// Many by ids/urls (parallel)
export function useStarshipsMany(
  idsOrUrls: Array<string> = [],
  enabled = true
) {
  const inputs = useMemo(() => idsOrUrls.map(normalizeInput), [idsOrUrls]);

  return useQueries({
    queries: inputs.map((info) => ({
      queryKey: ["starship", info.key],
      queryFn: () => fetchStarship(info),
      enabled: enabled && info.key !== "",
      staleTime: 60_000,
    })),
  });
}

// Paginated list with search
export function useAllStarships(page = 1, q = "") {
  return useQuery({
    queryKey: ["allStarships", page, q.trim()], // cache per page+query
    queryFn: () => fetchStarshipsPage(page, q),
    keepPreviousData: true,
    staleTime: 60_000,
  });
}
