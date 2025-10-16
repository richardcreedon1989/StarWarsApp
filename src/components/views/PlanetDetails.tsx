import Typography from "@mui/material/Typography";
import { usePlanets } from "../../hooks/usePlanets";
import { useFilmsMany } from "../../hooks/useFilms";
import { useResidentsMany } from "../../hooks/useResidents";

export default function PlanetDetails({ url }: { url: string }) {
  const { data, isLoading, isError } = usePlanets(url);
  const films = data?.films;
  const getPlanetFilms = useFilmsMany(films ?? []);

  const filmsToDisplay = getPlanetFilms
    .map((query) => query.data?.title)
    .filter(Boolean)
    .join(", ");

  const residents = data?.residents;
  const getResidentsNames = useResidentsMany(residents);

  const residentsToDisplay = getResidentsNames
    .map((query) => query.data?.name)
    .filter(Boolean)
    .join(", ");

  if (isLoading) return <Typography>Loading…</Typography>;
  if (isError || !data)
    return <Typography color="error">Failed to load.</Typography>;

  return (
    <>
      <Typography>
        <strong>Name: </strong> {data.name}
      </Typography>
      <Typography>
        <strong>Population: </strong> {data.population}
      </Typography>
      <Typography>
        <strong>Climate: </strong> {data.climate}
      </Typography>
      <Typography>
        <strong>Films: </strong> {filmsToDisplay || "None"}
      </Typography>
      <Typography>
        <strong>Residents: </strong> {residentsToDisplay || "None"}
      </Typography>
    </>
  );
}
