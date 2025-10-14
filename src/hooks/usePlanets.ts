import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPlanets = async () => {
  const { data } = await axios.get("https://swapi.dev/api/planets/");
  return data;
};

async function fetchPlanetByUrl(url) {
  console.log("urley");
  const { data } = await axios.get(url);
  console.log("data123", data);
  return data;
}

export function usePlanets(homeworld?: string) {
  console.log("homeworldHERE", homeworld);
  if (homeworld) {
    console.log("homeyCalled");
    return useQuery({
      queryKey: ["planet"],
      queryFn: () => fetchPlanetByUrl(homeworld),
      // staleTime: 60_000,
    });
  }

  // List mode (unchanged)
  return useQuery({
    queryKey: ["planets"],
    queryFn: fetchPlanets,
    staleTime: 60_000,
  });
}
