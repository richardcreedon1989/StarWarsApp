import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchByUrl = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const fetchStarshipsPage = async (page = 1, q = "") => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q && q.trim()) params.set("search", q.trim());

  const { data } = await axios.get(
    `https://swapi.dev/api/starships/?${params}`
  );
  return data;
};

export function useStarship(starshipUrl?: string | null) {
  const enabled = Boolean(starshipUrl);
  return useQuery({
    queryKey: ["starship", starshipUrl],
    queryFn: () => fetchByUrl(starshipUrl as string),
    enabled,
    staleTime: 60_000,
  });
}

export function useStarshipsMany(urls: string[] = [], enabled = true) {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: ["starship", url],
      queryFn: () => fetchByUrl(url),
      enabled: enabled && !!url,
      staleTime: 60_000,
    })),
  });
}

export function useAllStarships(page = 1, query = "") {
  return useQuery({
    queryKey: ["allStarships", page, query.trim()],
    queryFn: () => fetchStarshipsPage(page, query),
    staleTime: 60_000,
  });
}
