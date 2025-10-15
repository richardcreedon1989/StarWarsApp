import Typography from "@mui/material/Typography";
import { useResident } from "../../hooks/useResidentsTest";
import { useResidentsFilms } from "../../hooks/useResidentsFilms";
import { useStarship, useStarshipsMany } from "../../hooks/useStarships";
import { usePlanets } from "../../hooks/usePlanets";
import { useFilmsMany } from "../../hooks/useFilms";
import { useResidentsMany } from "../../hooks/useResidentsTest";
export default function StarshipDetails({ url }: { url: string }) {
  const { data, isLoading, isError } = useStarship(url);

  const films = data?.films;
  const getPlanetFilms = useFilmsMany(films ?? []);
  const starship = useStarship(url);
  const model = starship?.data?.model;
  const crew = starship?.data?.crew;
  const film123 = getPlanetFilms
    .map((q) => q.data?.title)
    .filter(Boolean)
    .join(", ");

  if (isLoading) return <Typography>Loading…</Typography>;
  if (isError || !data)
    return <Typography color="error">Failed to load.</Typography>;

  return (
    <>
      <Typography>Name: {data.name}</Typography>
      <Typography>Model: {model}</Typography>
      <Typography>Crew: {crew}</Typography>

      <Typography>Films: {film123 || "—"}</Typography>
    </>
  );
}
