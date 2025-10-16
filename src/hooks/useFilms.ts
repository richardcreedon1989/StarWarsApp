import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchFilmByUrl = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export function useFilmsMany(urls = [], enabled = true) {
  const safeUrls = useMemo(
    () => (Array.isArray(urls) ? urls.filter(Boolean) : []),
    [urls]
  );

  return useQueries({
    queries: safeUrls.map((url) => ({
      queryKey: ["film", url],
      queryFn: () => fetchFilmByUrl(url),
      enabled: enabled && !!url,
      staleTime: 60_000,
    })),
  });
}
