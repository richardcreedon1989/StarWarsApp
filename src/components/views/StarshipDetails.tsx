import Typography from "@mui/material/Typography";

import { useStarship } from "../../hooks/useStarships";
import { useFilmsMany } from "../../hooks/useFilms";

export default function StarshipDetails({ url }: { url: string }) {
  const { data, isLoading, isError } = useStarship(url);

  const films = data?.films;
  const getPlanetFilms = useFilmsMany(films ?? []);
  const starship = useStarship(url);
  const model = starship?.data?.model;
  const crew = starship?.data?.crew;
  const filmsToDisplay = getPlanetFilms
    .map((query) => query.data?.title)
    .filter(Boolean)
    .join(", ");

  if (isLoading) return <Typography>Loading…</Typography>;
  if (isError || !data)
    return <Typography color="error">Failed to load.</Typography>;

  return (
    <>
      <Typography>
        {" "}
        <strong>Name: </strong> {data.name}
      </Typography>
      <Typography>
        {" "}
        <strong>Model: </strong> {model}
      </Typography>
      <Typography>
        {" "}
        <strong>Crew:</strong> {crew}
      </Typography>
      <Typography>
        {" "}
        <strong>Films: </strong> {filmsToDisplay || "None"}
      </Typography>
    </>
  );
}
