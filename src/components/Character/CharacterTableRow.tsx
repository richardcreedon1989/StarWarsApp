import { useMemo, useState } from "react";
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
import { usePlanets } from "../../hooks/usePlanets";
import { useStarshipsMany } from "../../hooks/useStarships";
import { useFilmsMany } from "../../hooks/useFilms";
import { useEntityDialog } from "../../context/EntityDialogContext";

export default function CharacterTableRow({ person }: { person: any }) {
  const [open, setOpen] = useState(false);
  const { openEntity } = useEntityDialog();

  const homeworldUrl = person?.homeworld;
  const films = person?.films ?? [];
  const starships = person?.starships ?? [];

  const homeworldQuery = usePlanets(homeworldUrl);
  const homeworldName = homeworldQuery?.data?.name;
  const homeworldQueryUrl = homeworldQuery?.data?.url ?? homeworldUrl;

  const filmsQuery = useFilmsMany(films, open);
  const starshipsQuery = useStarshipsMany(starships, open);

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
            onClick={() => setOpen((openState) => !openState)}
            aria-label={
              open ? "Collapse character details" : "Expand character details"
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
            {person.name}
          </Link>
        </TableCell>

        <TableCell>{homeworldName}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2 }}>
              <Stack spacing={1}>
                <div>
                  <strong>Name:</strong> {person.name}
                </div>
                <div>
                  <strong>Homeworld:</strong>{" "}
                  {homeworldName ? (
                    <Link
                      component="button"
                      underline="hover"
                      onClick={(e) => {
                        e.preventDefault();
                        openEntity({
                          type: "planet",
                          url: homeworldQueryUrl,
                          name: homeworldName,
                        });
                      }}
                    >
                      {homeworldName}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </div>
                <div>
                  <strong>Starships:</strong>{" "}
                  {starships.length === 0
                    ? "N/A"
                    : starshipsQuery
                        .filter((query: any) => query?.data && !query.isError)
                        .map((item: any) => {
                          const name = item.data.name;
                          const url = item.data.url;
                          return (
                            <Chip
                              key={url}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                              label={name}
                              onClick={(e) => {
                                e.preventDefault();
                                openEntity({ type: "starship", url, name });
                              }}
                            />
                          );
                        })}
                </div>
                <div>
                  <strong>Films:</strong> {filmTitles}
                </div>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
