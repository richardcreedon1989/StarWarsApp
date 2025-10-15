import Typography from "@mui/material/Typography";
import { useResident } from "../../hooks/useResidentsTest";
import { useResidentsFilms } from "../../hooks/useResidentsFilms";
import { useStarshipsMany } from "../../hooks/useStarships";
import { usePlanets } from "../../hooks/usePlanets";
import { useFilmsMany } from "../../hooks/useFilms";
import { useResidentsMany } from "../../hooks/useResidentsTest";
export default function PlanetDetails({ url }: { url: string }) {
  const { data, isLoading, isError } = usePlanets(url);
  const homeworld = data?.url;
  const films = data?.films;
  const getPlanetFilms = useFilmsMany(films ?? []);

  const film123 = getPlanetFilms
    .map((q) => q.data?.title)
    .filter(Boolean)
    .join(", ");

  const residents = data?.residents;
  const getResidentsNames = useResidentsMany(residents);

  const residents123 = getResidentsNames
    .map((q) => q.data?.name)
    .filter(Boolean)
    .join(", ");

  if (isLoading) return <Typography>Loading…</Typography>;
  if (isError || !data)
    return <Typography color="error">Failed to load.</Typography>;

  return (
    <>
      <Typography>Name: {data.name}</Typography>
      <Typography>Population: {data.population}</Typography>
      <Typography>Climate: {data.climate}</Typography>

      <Typography>Films: {film123 || "—"}</Typography>
      <Typography>Residents: {residents123 || "—"}</Typography>
    </>
  );
}
