import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useResident } from "./useResidentsTest"; // your existing hook

const fetchFilm = (url) => axios.get(url).then((r) => r.data);

export function usePlanetsFilms(residentUrl, enabled = true) {
  // fetch the person first (only when enabled, e.g., when dialog is open)
  const { data: person } = useResident(enabled ? residentUrl : null);

  const filmUrls = person?.films ?? [];
  const filmQs = useQueries({
    queries: filmUrls.map((url) => ({
      queryKey: ["film", url],
      queryFn: () => fetchFilm(url),
      enabled: enabled && !!url,
      staleTime: 60_000,
    })),
  });

  const titles = filmQs.map((q) => q.data?.title).filter(Boolean);
  const isLoading = enabled && (!person || filmQs.some((q) => q.isLoading));
  const isError = filmQs.some((q) => q.isError);

  return { titles, isLoading, isError };
}
