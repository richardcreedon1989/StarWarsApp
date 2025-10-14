// features/planets/PlanetCardContainer.tsx
// import CardComponent from "./CardComponent";
import CharacterCardComponent from "./CharacterCardComponent";
import { useAllResidents } from "../../hooks/useResidentsTest"; // the JS version we wrote

// import { useFilms } from "./hooks/useFilms";
// import { useResidents } from "./hooks/useResidents";

export default function CharacterCardContainer() {
  const starWarsData = useAllResidents();

  const { data, isLoading, isError } = starWarsData;

  if (isLoading) {
    console.log("⏳ Loading planets...");
    return <div>Loading planets...</div>;
  }

  if (isError) {
    console.error("❌ Error loading planets");
    return <div>Error fetching planets</div>;
  }
  const characters = data?.results;
  console.log("characters123", characters);

  const mapPlanet = characters?.map((item) => {
    return <CharacterCardComponent props={item} />;
  });
  return mapPlanet;
}
