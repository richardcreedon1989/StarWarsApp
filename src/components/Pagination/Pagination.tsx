import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pages({ setPage, page, count }) {
  const countPages = Math.ceil(count / 10);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // <-- selected page number
  };

  return (
    <Stack spacing={2}>
      <Pagination count={countPages} page={page} onChange={handleChange} />
    </Stack>
  );
}
