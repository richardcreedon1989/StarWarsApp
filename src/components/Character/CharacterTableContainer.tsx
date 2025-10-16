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

  const rows = useMemo(() => {
    const items = data?.results ?? [];

    return order === "asc"
      ? sort(items).asc((p: any) => String(p.name ?? "").toLowerCase())
      : sort(items).desc((p: any) => String(p.name ?? "").toLowerCase());
  }, [data?.results, order]);

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
          {rows.map((person: any) => (
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
