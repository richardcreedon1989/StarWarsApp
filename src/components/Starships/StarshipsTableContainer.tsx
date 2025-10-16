import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { useAllStarships } from "../../hooks/useStarships";
import StarshipsTableRow from "./StarshipsTableRow";

type Props = {
  page: number;
  setCount: (items: number) => void;
};

export default function StarshipsTableContainer({ page, setCount }: Props) {
  const { data, isLoading, isError } = useAllStarships(page);

  useEffect(() => {
    if (typeof data?.count === "number") setCount(data.count);
  }, [data?.count, setCount]);

  if (isLoading) return <div>Loading starships…</div>;
  if (isError) return <div>Error loading starships</div>;

  const rows = data?.results ?? [];

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table size="small" aria-label="starships table">
        <TableHead>
          <TableRow>
            <TableCell width={48} />
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((ship: any) => (
            <StarshipsTableRow
              key={ship.url ?? `${ship.name}-${ship.model}`}
              ship={ship}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
