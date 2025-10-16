import { useState, useMemo } from "react";

import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Link,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFilmsMany } from "../../hooks/useFilms";

export default function StarshipsTableRow({ ship }: { ship: any }) {
  const [open, setOpen] = useState(false);

  const films = ship?.films ?? [];
  const filmsQuery = useFilmsMany(films, open);

  const filmTitles = useMemo(
    () =>
      filmsQuery
        ?.map((query: any) => query?.data?.title)
        .filter(Boolean)
        .join(", ") || "—",
    [filmsQuery]
  );

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen((v) => !v)}
            aria-label={
              open ? "Collapse starship details" : "Expand starship details"
            }
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Link
            component="button"
            underline="hover"
            onClick={() => setOpen((openState) => !openState)}
          >
            {ship.name}
          </Link>
        </TableCell>

        <TableCell>{ship.model}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Stack spacing={1}>
                <div>
                  <strong>Name:</strong> {ship.name}
                </div>
                <div>
                  <strong>Model:</strong> {ship.model}
                </div>
                <div>
                  <strong>Crew:</strong> {ship.crew ?? "unknown"}
                </div>
                <div>
                  <strong>Movies:</strong> {filmTitles}
                </div>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
