import { useState, useMemo } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Stack,
  Chip,
  Link,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFilmsMany } from "../../hooks/useFilms";
import { useResidentsMany } from "../../hooks/useResidents";
import { useEntityDialog } from "../../context/EntityDialogContext";

type Props = { planet: any };

export default function PlanetTableRow({ planet }: Props) {
  const [open, setOpen] = useState(false);
  const { openEntity } = useEntityDialog();

  const films = planet?.films ?? [];
  const residents = planet?.residents ?? [];

  const filmsQuery = useFilmsMany(films, open);
  const residentsQuery = useResidentsMany(residents, open);

  const filmTitles = useMemo(
    () =>
      filmsQuery
        ?.map((queryResult: any) => queryResult?.data?.title)
        .filter(Boolean)
        .join(", ") || "None",
    [filmsQuery]
  );

  return (
    <>
      <TableRow data-testid="planet-row" hover>
        <TableCell width={48}>
          <IconButton
            size="small"
            onClick={() => setOpen((openState) => !openState)}
            aria-label={open ? "Collapse" : "Expand"}
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
            {planet.name}
          </Link>
        </TableCell>

        <TableCell align="right">{planet.population ?? "unknown"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Stack spacing={1}>
                <div>
                  <strong>Name:</strong> {planet.name}
                </div>
                <div>
                  <strong>Population:</strong> {planet.population}
                </div>
                <div>
                  <strong>Climate:</strong> {planet.climate}
                </div>
                <div>
                  <strong>Films:</strong> {filmTitles}
                </div>
                <div>
                  <strong>Residents:</strong>{" "}
                  {residents.length === 0
                    ? "None"
                    : residentsQuery.map((queryResult: any, i: number) => {
                        const name = queryResult?.data?.name;
                        const url = queryResult?.data?.url;
                        if (!name || !url) return null;
                        return (
                          <Chip
                            key={url}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                            label={name}
                            onClick={(e) => {
                              e.preventDefault();
                              openEntity({ type: "person", url, name });
                            }}
                          />
                        );
                      })}
                </div>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
