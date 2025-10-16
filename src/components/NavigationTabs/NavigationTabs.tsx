import { useEffect, useState, SyntheticEvent, ReactNode } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "../Pagination/Pagination";
import PlanetTableContainer from "../Planet/PlanetTableContainer";
import CharacterTableContainer from "../Character/CharacterTableContainer";
import StarshipsTableContainer from "../Starships/StarshipsTableContainer";
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function NavigationTabs() {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setPage(1);
    setInput("");
  }, [value]);

  useEffect(() => {
    const id = setTimeout(() => {
      setPage(1);
      setQuery(input);
    }, 300);
    return () => clearTimeout(id);
  }, [input]);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentLabel =
    value === 0 ? "Planets" : value === 1 ? "Characters" : "Starships";

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="Planets" />
          <Tab label="Characters" />
          <Tab label="Starships" />
        </Tabs>
      </Box>

      {value !== 2 && (
        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            size="small"
            label={`Search ${currentLabel}`}
            placeholder={`Search ${currentLabel}…`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Box>
      )}

      <CustomTabPanel value={value} index={0}>
        <PlanetTableContainer page={page} setCount={setCount} search={query} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <CharacterTableContainer
          page={page}
          setCount={setCount}
          search={query}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <StarshipsTableContainer page={page} setCount={setCount} />
      </CustomTabPanel>

      <Pagination page={page} setPage={setPage} count={count} />
    </Box>
  );
}
