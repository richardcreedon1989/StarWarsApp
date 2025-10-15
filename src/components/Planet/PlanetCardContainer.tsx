// features/planets/PlanetCardContainer.tsx
import React from "react";
import PlanetCardComponent from "./PlanetCardComponent";
import { usePlanets } from "../../hooks/usePlanets";
import { useEffect } from "react";
type Props = {
  page: number;
  search: string;
  setCount: (pages: number) => void; // expecting total pages
};

export default function PlanetCardContainer({ page, search, setCount }: Props) {
  // list mode: pass undefined for homeworld
  const { data, isLoading, isError } = usePlanets(undefined, page, search);

  useEffect(() => {
    if (data?.count != null) setCount(data.count); // send items, not pages
  }, [data?.count, setCount]);

  if (isLoading) return <div>Loading planets...</div>;
  if (isError) return <div>Error fetching planets</div>;

  const planets = data?.results ?? [];

  return (
    <>
      {planets.map((item: any) => (
        <PlanetCardComponent key={item.url ?? item.name} props={item} />
      ))}
    </>
  );
}
