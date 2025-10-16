import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useResident } from "./useResidents"; // your existing hook

const fetchFilm = (url: string) => axios.get(url).then((r) => r.data);

export function useResidentsFilms(residentUrl: string, enabled = true) {
  const { data: person } = useResident(enabled ? residentUrl : null);

  const filmUrls = person?.films ?? [];
  const filmsQuery = useQueries({
    queries: filmUrls.map((url: string) => ({
      queryKey: ["film", url],
      queryFn: () => fetchFilm(url),
      enabled: enabled && !!url,
      staleTime: 60_000,
    })),
  });

  const titles = filmsQuery.map((query) => query.data?.title).filter(Boolean);
  const isLoading =
    enabled && (!person || filmsQuery.some((query) => query.isLoading));
  const isError = filmsQuery.some((query) => query.isError);

  return { titles, isLoading, isError };
}
