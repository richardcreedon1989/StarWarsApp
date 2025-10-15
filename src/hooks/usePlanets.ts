import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPlanets = async (page = 1, q = "") => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (q.trim()) params.set("search", q.trim());

  const { data } = await axios.get(`https://swapi.dev/api/planets/?${params}`);
  // -> { count, next, previous, results }
  return data;
};

const fetchPlanetByUrl = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

/**
 * usePlanets:
 * - If `homeworld` (URL) is provided -> fetch that single planet
 * - Else -> fetch paginated list with optional search `q`
 */
export function usePlanets(
  homeworld?: string,
  page: number = 1,
  q: string = ""
) {
  const planetQuery = useQuery({
    queryKey: ["planet", homeworld],
    enabled: !!homeworld,
    queryFn: () => fetchPlanetByUrl(homeworld as string),
    staleTime: 60_000,
  });

  const listQuery = useQuery({
    queryKey: ["planets", page, q.trim()], // cache per page+query
    enabled: !homeworld, // only when not fetching single
    queryFn: () => fetchPlanets(page, q),
    keepPreviousData: true, // smoother pagination
    staleTime: 60_000,
  });

  return homeworld ? planetQuery : listQuery;
}
