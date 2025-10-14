// features/planets/PlanetCardContainer.tsx
import CardComponent from "../Card/CardComponent";
import { useFilms } from "../../hooks/useFilms";
import { useResident } from "../../hooks/useResidentsTest";
import { useResidentsMany } from "../../hooks/useResidentsTest"; // the JS version we wrote
import * as React from "react";
import { usePlanets } from "../../hooks/usePlanets";
import { useEntityDialog } from "../../context/EntityDialogContext";
import { useStarship, useStarshipsMany } from "../../hooks/useStarships";
export default function CharacterCardComponent({ props }) {
  const [expanded, setExpanded] = React.useState(true); //when user clicks expand
  const { openEntity } = useEntityDialog();

  const { films, starships, homeworld, name } = props;
  const getPlanet = usePlanets(homeworld);
  console.log("getPlanetHere", getPlanet);
  const url = getPlanet?.data?.url;
  // console.log("getPlanet", getPlanet);
  const homePlanet = getPlanet?.data?.name;

  const moviesToDisplay = films?.map((film) => {
    const movieId = film.slice(-2, -1);
    const getMovieData = useFilms(movieId);
    const data = getMovieData?.data;
    const title = data?.title;
    return { title };
  });

  const displayStarship = ({ url, name }) => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          openEntity({ type: "starship", url, name });
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
    );
  };

  const getStarshipsData = useStarshipsMany(starships);

  const shipButtons = (getStarshipsData ?? [])
    // render only when we actually have a starship object
    .filter((q) => q?.data && !q.isError)
    .map((q) => {
      const { name, url } = q.data; // safe now
      return (
        <React.Fragment key={url}>
          {displayStarship({ name, url })}
          {/* add ", " if you want separators */}
        </React.Fragment>
      );
    });

  const displayPlanet = ({ url, name }) => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          openEntity({ type: "planet", url, name });
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
    );
  };

  console.log("ateadssa", getPlanet);

  const shipPlanetButtons = (planetQ) => {
    const url = planetQ?.data?.url;
    const name = planetQ?.data?.name;
    if (!url || !name) return null; // still loading or failed
    return (
      <React.Fragment key={url}>{displayPlanet({ url, name })}</React.Fragment>
    );
  };

  const clicker = () => {
    return (
      <>
        {shipPlanetButtons(getPlanet)}
        <br />
        {shipButtons}
      </>
    );
  };

  const displayHomePlanet = () => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          openEntity({ type: "planet", url, name });
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
        {homePlanet}
      </button>
    );
  };

  return (
    <CardComponent
      title={`Name: ${name}`}
      subtitle={`Homeworld: ${homePlanet}`}
      // clickableItems={displayHomePlanet()}
      clickableItems={clicker()}

      // expandedItems={[
      //   <>
      //     <strong>Films:</strong> {joinedTitles}
      //   </>,
      // ]}
      //   clickableItems={
      //     residents.length === 0
      //       ? "—"
      //       : residentQs.map((q, i) => {
      //           const name =
      //             q.data?.name ??
      //             (q.isLoading
      //               ? "Loading…"
      //               : q.isError
      //               ? "Failed to load"
      //               : `Resident ${i + 1}`);
      //           return (
      //             <React.Fragment key={residents[i]}>
      //               <a
      //                 href={residents[i]}
      //                 onClick={(e) => e.preventDefault()}
      //                 style={{
      //                   textDecoration: "underline",
      //                   cursor: "pointer",
      //                 }}
      //               >
      //                 {name}
      //               </a>
      //               {i < residentQs.length - 1 ? ", " : ""}
      //             </React.Fragment>
      //           );
      //         })
      //   }
    />
  );
}
