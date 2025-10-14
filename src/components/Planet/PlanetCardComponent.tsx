// features/planets/PlanetCardContainer.tsx
import CardComponent from "../Card";
import { useFilmsMany, useFilms } from "../../hooks/useFilms";
import { useResidentsMany } from "../../hooks/useResidentsTest"; // the JS version we wrote
import * as React from "react";
import { useEntityDialog } from "../../context/EntityDialogContext";

export default function PlanetCardComponent({ props }) {
  const [expanded, setExpanded] = React.useState(true); //when user clicks expand
  const { openEntity } = useEntityDialog();

  const { population, climate, films, residents, name } = props;

  const moviesToDisplay = films?.map((film) => {
    const movieId = film.slice(-2, -1);
    const getMovieData = useFilms(movieId);
    const data = getMovieData?.data;
    const title = data?.title;
    return { title };
  });

  const residentsQuery = useResidentsMany(residents, expanded);
  const movieTitles = moviesToDisplay.map((movie) => movie.title);

  const joinedTitles = movieTitles.join(",");

  const displayResidents = () => {
    return residents.length === 0
      ? "—"
      : residentsQuery.map((residentsData, index) => {
          const name = residentsData.data?.name;
          const url = residentsData.data?.url;

          return (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openEntity({ type: "person", url, name });
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  textDecoration: "underline",
                  cursor: "pointer",
                  font: "inherit",
                  color: "inherit",
                }}
                aria-label={`Open details for ${name}`}
              >
                {name}
              </button>
            </>
          );
        });
  };

  return (
    <CardComponent
      title={`Name: ${name}`}
      subtitle={`Population: ${population}`}
      climate={`Climate: ${climate}`}
      expandedItems={[
        <>
          <strong>Films:</strong> {joinedTitles}
        </>,
      ]}
      clickableItems={displayResidents()}
    />
  );
}
