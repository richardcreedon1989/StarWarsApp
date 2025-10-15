// features/character/CharacterCardContainer.tsx
import * as React from "react";
import CharacterCardComponent from "./CharacterCardComponent";
import { useAllResidents } from "../../hooks/useResidentsTest";

type Props = {
  page: number;
  setCount: (pages: number) => void; // expects number of pages
  search?: string; // optional search term
};

export default function CharacterCardContainer({
  page,
  setCount,
  search = "",
}: Props) {
  // useAllResidents should be (page, q)
  const { data, isLoading, isError } = useAllResidents(page, search);

  // update pagination count when data changes (SWAPI page size = 10)
  React.useEffect(() => {
    if (data?.count != null) setCount(data.count); // items, not pages
  }, [data?.count, setCount]);

  if (isLoading) return <div>Loading characters…</div>;
  if (isError) return <div>Error fetching characters</div>;

  const characters = data?.results ?? [];

  return (
    <>
      {characters.map((item: any) => (
        <CharacterCardComponent key={item.url ?? item.name} props={item} />
      ))}
    </>
  );
}
