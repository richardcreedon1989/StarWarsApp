// features/planets/PlanetCardContainer.tsx
// import CardComponent from "./CardComponent";
import PlanetCardComponent from "./PlanetCardComponent";
import { usePlanets } from "../../hooks/usePlanets";

// import { useFilms } from "./hooks/useFilms";
// import { useResidents } from "./hooks/useResidents";

export default function PlanetCardContainer({ onOpenResident }) {
  const starWarsData = usePlanets();
  const { data, isLoading, isError } = starWarsData;

  if (isLoading) {
    console.log("⏳ Loading planets...");
    return <div>Loading planets...</div>;
  }

  if (isError) {
    console.error("❌ Error loading planets");
    return <div>Error fetching planets</div>;
  }
  const planets = data?.results;
  console.log("planet12345", data);

  const mapPlanet = planets?.map((item) => {
    return <PlanetCardComponent props={item} />;
  });
  return mapPlanet;
}
