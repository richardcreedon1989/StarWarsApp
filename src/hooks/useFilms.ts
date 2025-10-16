import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchFilmByUrl = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export function useFilmsMany(urls = [], enabled = true) {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: ["film", url],
      queryFn: () => fetchFilmByUrl(url),
      enabled: enabled && !!url,
      staleTime: 60_000,
    })),
  });
}
