import Typography from "@mui/material/Typography";
import { useResident } from "../../hooks/useResidentsTest";
import { useResidentsFilms } from "../../hooks/useResidentsFilms";
import { useStarshipsMany } from "../../hooks/useStarships";
import { usePlanets } from "../../hooks/usePlanets";

export default function PersonDetails({ url }: { url: string }) {
  const { data, isLoading, isError } = useResident(url);
  const { titles } = useResidentsFilms(url, true);
  const starshipQs = useStarshipsMany(data?.starships ?? []);
  const starships = starshipQs
    .map((q) => q.data?.name)
    .filter(Boolean)
    .join(", ");

  const homeworld = data.homeworld;
  const getHomeworld = usePlanets(homeworld)?.data?.name;

  if (isLoading) return <Typography>Loading…</Typography>;
  if (isError || !data)
    return <Typography color="error">Failed to load.</Typography>;

  return (
    <>
      <Typography>Name: {data.name}</Typography>
      <Typography>Homeworld: {getHomeworld}</Typography>
      <Typography>Films: {titles.join(", ") || "—"}</Typography>
      <Typography>Starships: {starships || "—"}</Typography>
    </>
  );
}
