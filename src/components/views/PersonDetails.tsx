import Typography from "@mui/material/Typography";
import { useResident } from "../../hooks/useResidents";
import { useResidentsFilms } from "../../hooks/useResidentsFilms";
import { useStarshipsMany } from "../../hooks/useStarships";
import { usePlanets } from "../../hooks/usePlanets";

export default function PersonDetails({ url }: { url: string }) {
  const { data, isLoading, isError } = useResident(url);
  const { titles } = useResidentsFilms(url, true);
  const starShipsQuery = useStarshipsMany(data?.starships ?? []);
  const starships = starShipsQuery
    .map((query) => query.data?.name)
    .filter(Boolean)
    .join(", ");

  const homeworld = data.homeworld;
  const getHomeworld = usePlanets(homeworld)?.data?.name;

  if (isLoading) return <Typography>Loading…</Typography>;
  if (isError || !data)
    return <Typography color="error">Failed to load.</Typography>;

  return (
    <>
      <Typography>
        <strong> Name: </strong> {data.name}
      </Typography>
      <Typography>
        <strong> Homeworld:</strong> {getHomeworld}
      </Typography>
      <Typography>
        <strong> Films: </strong> {titles.join(", ") || "None"}
      </Typography>
      <Typography>
        <strong> Starships: </strong> {starships || "None"}
      </Typography>
    </>
  );
}
