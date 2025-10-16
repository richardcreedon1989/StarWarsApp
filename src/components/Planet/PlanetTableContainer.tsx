import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
} from "@mui/material";
import { usePlanets } from "../../hooks/usePlanets";
import PlanetTableRow from "./PlanetTableRow";
import { sort } from "fast-sort";

type Dir = "asc" | "desc";

type Props = {
  page: number;
  search: string;
  setCount: (items: number) => void;
};

export default function PlanetTableContainer({
  page,
  search,
  setCount,
}: Props) {
  const { data, isLoading, isError } = usePlanets(undefined, page, search);

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

  if (isLoading) return <div>Loading planets…</div>;
  if (isError) return <div>Error loading planets</div>;

  return (
    <TableContainer>
      <Table size="small" aria-label="planets">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sortDirection={order}>
              <TableSortLabel
                active={true}
                direction={order}
                onClick={() => handleSort()}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Population</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((planet: any) => (
            <PlanetTableRow key={planet.url ?? planet.name} planet={planet} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
