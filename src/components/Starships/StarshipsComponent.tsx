import React from "react";
import CardComponent from "../Card/CardComponent";
import { useFilms, useFilmsMany } from "../../hooks/useFilms";
const StarshipsComponent = ({ props }) => {
  //   const [expanded, setExpanded] = React.useState(true); //when user clicks expand
  const { films, name } = props;
  console.log("props4441", name);
  const allFilms = useFilmsMany(films ?? []);
  console.log("allFilms", allFilms);

  const moviesToDisplay = allFilms.map((film) => {
    console.log("filmHere", film);
    const title = film?.data?.title;
    return title;
  });
  const joinedTitles = moviesToDisplay.join(",");

  return (
    <CardComponent
      title={`Name: ${props.name}`}
      subtitle={`Model: ${props.model}`}
      expandedItems={[
        <>
          <strong>Crew:</strong> {props.crew}
          <strong>Movies:</strong> {joinedTitles}
        </>,
      ]}
    />
  );
};

export default StarshipsComponent;
