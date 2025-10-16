import { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type Props = {
  setPage: (page: number) => void;
  page: number;
  count: number;
};

export default function Pages({ setPage, page, count }: Props) {
  const countPages = Math.ceil(count / 10);

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={countPages} page={page} onChange={handleChange} />
    </Stack>
  );
}
