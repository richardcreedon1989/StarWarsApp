import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { useAllResidents } from "../../hooks/useResidents";
import CharacterTableRow from "./CharacterTableRow";
import { sort } from "fast-sort";
import { Person } from "../../types/person.types";
type Dir = "asc" | "desc";

type Props = {
  page: number;
  search: string;
  setCount: (items: number) => void;
};

export default function CharacterTableContainer({
  page,
  search,
  setCount,
}: Props) {
  const { data, isLoading, isError } = useAllResidents(page, search);

  useEffect(() => {
    if (typeof data?.count === "number") setCount(data.count);
  }, [data?.count, setCount]);

  const [order, setOrder] = useState<Dir>("asc");

  const handleSort = () => {
    setOrder((o) => (o === "asc" ? "desc" : "asc"));
  };

  const items: Person[] = useMemo(
    () => (data?.results ?? []) as Person[],
    [data?.results]
  );

  const sorted = useMemo(() => {
    const s = sort<Person>(items);
    return order === "asc"
      ? s.asc((p) => (p.name ?? "").toLowerCase())
      : s.desc((p) => (p.name ?? "").toLowerCase());
  }, [items, order]);

  if (isLoading) return <div>Loading characters…</div>;
  if (isError) return <div>Error loading characters</div>;

  return (
    <TableContainer>
      <Table size="small" aria-label="characters table">
        <TableHead>
          <TableRow>
            <TableCell width={48} />
            <TableCell sortDirection={order}>
              <TableSortLabel active direction={order} onClick={handleSort}>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Homeworld</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sorted.map((person: Person) => (
            <CharacterTableRow
              key={person.url ?? person.name}
              person={person}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
