import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchByUrl = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const fetchResidentsPage = async (page = 1, q = "") => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q && q.trim()) params.set("search", q.trim());
  const { data } = await axios.get(`https://swapi.dev/api/people/?${params}`);
  return data;
};

export function useResident(residentUrl: string) {
  const enabled = Boolean(residentUrl);

  return useQuery({
    queryKey: ["resident", residentUrl],
    queryFn: () => fetchByUrl(residentUrl),
    enabled,
    staleTime: 60_000,
  });
}

export function useResidentsMany(urls = [], enabled = true) {
  const safeUrls = useMemo(
    () => (Array.isArray(urls) ? urls.filter(Boolean) : []),
    [urls]
  );

  return useQueries({
    queries: safeUrls.map((url) => ({
      queryKey: ["resident", url],
      queryFn: () => fetchByUrl(url),
      enabled: enabled && !!url,
      staleTime: 60_000,
    })),
  });
}

export function useAllResidents(page = 1, q = "") {
  return useQuery({
    queryKey: ["allResidents", page, q.trim()],
    queryFn: () => fetchResidentsPage(page, q),
    staleTime: 60_000,
  });
}
