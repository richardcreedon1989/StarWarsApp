import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPlanets = async (page = 1, query = "") => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (query) params.set("search", query.trim());

  const { data } = await axios.get(`https://swapi.dev/api/planets/?${params}`);
  return data;
};

const fetchPlanetByUrl = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export function usePlanets(
  homeworld?: string,
  page: number = 1,
  query: string = ""
) {
  const singlePlanetQuery = useQuery({
    queryKey: ["planet", homeworld],
    queryFn: () => fetchPlanetByUrl(homeworld!),
    enabled: typeof homeworld === "string" && homeworld.length > 0,
    staleTime: 60_000,
  });

  const multiplePlanetsQuery = useQuery({
    queryKey: ["planets", page, query.trim()],
    enabled: !homeworld,
    queryFn: () => fetchPlanets(page, query),
    staleTime: 60_000,
  });

  return homeworld ? singlePlanetQuery : multiplePlanetsQuery;
}
