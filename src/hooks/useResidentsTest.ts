// hooks/useResidents.js
import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

// --- helpers ---------------------------------------------------------------

function isUrl(input) {
  return /^https?:\/\//i.test(input);
}

function getIdFromUrl(url) {
  const m = url.match(/people\/(\d+)\/?$/);
  return m ? m[1] : null;
}

function normalizeInput(input) {
  if (input === null || input === undefined) return { key: "" };
  const s = String(input).trim();
  if (!s) return { key: "" };

  if (isUrl(s)) {
    return { key: s, url: s, id: getIdFromUrl(s) || undefined };
  }
  return { key: s, id: s };
}

// single fetcher (by id/url)
async function fetchResident(info) {
  if (info?.url) {
    const { data } = await axios.get(info.url);
    return data;
  }
  if (info?.id) {
    const { data } = await axios.get(
      `https://swapi.dev/api/people/${info.id}/`
    );
    return data;
  }
  throw new Error("No resident identifier provided");
}

// list fetcher (paginated + search)
async function fetchResidentsPage(page = 1, q = "") {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q.trim()) params.set("search", q.trim());

  const { data } = await axios.get(`https://swapi.dev/api/people/?${params}`);
  // { count, next, previous, results }
  return data;
}

// --- single resident -------------------------------------------------------

export function useResident(residentIdOrUrl) {
  const info = normalizeInput(residentIdOrUrl);
  const enabled = info.key !== "";

  return useQuery({
    queryKey: ["resident", info.key],
    queryFn: () => fetchResident(info),
    enabled,
    staleTime: 60_000,
  });
}

// --- many residents (array) -----------------------------------------------

export function useResidentsMany(idsOrUrls = [], enabled = true) {
  const inputs = useMemo(() => idsOrUrls.map(normalizeInput), [idsOrUrls]);

  return useQueries({
    queries: inputs.map((info) => ({
      queryKey: ["resident", info.key],
      queryFn: () => fetchResident(info),
      enabled: enabled && info.key !== "",
      staleTime: 60_000,
    })),
  });
}

// --- paginated list (with search) -----------------------------------------

export function useAllResidents(page = 1, q = "") {
  return useQuery({
    queryKey: ["allResidents", page, q.trim()], // cache per page+query
    queryFn: () => fetchResidentsPage(page, q),
    keepPreviousData: true,
    staleTime: 60_000,
  });
}

// Optional alias if you want old imports to keep working:
// export { useAllResidents as useResidentsList };
