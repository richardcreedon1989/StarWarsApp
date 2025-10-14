// features/planets/PlanetCardContainer.tsx
// import CardComponent from "./CardComponent";
import { usePlanets } from "../../hooks/usePlanets";
import { useAllStarships } from "../../hooks/useStarships";
import StarshipsComponent from "./StarshipsComponent";
// import { useFilms } from "./hooks/useFilms";
// import { useResidents } from "./hooks/useResidents";

export default function StarshipsContainer() {
  const starships = useAllStarships();
  const { data, isLoading, isError } = starships;

  if (isLoading) {
    console.log("⏳ Loading planets...");
    return <div>Loading planets...</div>;
  }

  if (isError) {
    console.error("❌ Error loading planets");
    return <div>Error fetching planets</div>;
  }
  // console.log("starships123", starships);
  const starshipsData = data.results;

  const mapStarships = starshipsData?.map((item) => {
    return <StarshipsComponent props={item} />;
  });
  return mapStarships;
}
