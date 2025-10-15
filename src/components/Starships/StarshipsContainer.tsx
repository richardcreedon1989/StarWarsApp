// features/starships/StarshipsContainer.tsx
import * as React from "react";
import { useAllStarships } from "../../hooks/useStarships";
import StarshipsComponent from "./StarshipsComponent";

type Props = {
  page: number;
  setCount: (itemsCount: number) => void; // <-- raw items count (not pages)
  search?: string; // optional, if your hook supports it
};

export default function StarshipsContainer({
  page,
  setCount,
  search = "",
}: Props) {
  // If your hook supports search: useAllStarships(page, search)
  const { data, isLoading, isError } = useAllStarships(page, search);

  // send RAW items count up (Pages does Math.ceil(count / 10))
  React.useEffect(() => {
    if (typeof data?.count === "number") {
      setCount(data.count);
    }
  }, [data?.count, setCount]);

  if (isLoading) return <div>Loading starships…</div>;
  if (isError) return <div>Error fetching starships</div>;

  const starships = data?.results ?? [];

  return (
    <>
      {starships.map((item: any) => (
        <StarshipsComponent
          key={item.url ?? `${item.name}-${item.model}`}
          props={item}
        />
      ))}
    </>
  );
}
