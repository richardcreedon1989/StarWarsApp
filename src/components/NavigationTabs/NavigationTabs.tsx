import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"; // <-- NEW
import PlanetCardContainer from "../Planet/PlanetCardContainer";
import CharacterCardContainer from "../Character/CharactersCardContainer";
import StarshipsContainer from "../Starships/StarshipsContainer";
import Pagination from "../Pagination/Pagination";

interface TabPanelProps {
  children?: React.ReactNode;
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NavigationTabs() {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  // search state (input + debounced query)
  const [input, setInput] = React.useState("");
  const [query, setQuery] = React.useState("");

  // reset page when switching tabs
  React.useEffect(() => {
    setPage(1);
  }, [value]);

  // debounce search input -> query
  React.useEffect(() => {
    const id = setTimeout(() => {
      setPage(1); // reset to first page on new search
      setQuery(input);
    }, 300);
    return () => clearTimeout(id);
  }, [input]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // nice label per tab
  const currentLabel =
    value === 0 ? "Planets" : value === 1 ? "Characters" : "Starships";

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Planets" {...a11yProps(0)} />
          <Tab label="Characters" {...a11yProps(1)} />
          <Tab label="Starships" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* --- Search input (debounced) --- */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          label={`Search ${currentLabel}`}
          placeholder={`Search ${currentLabel}…`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
      </Box>

      <CustomTabPanel value={value} index={0}>
        {/* Pass query down so each container can call ?search=<query>&page=<page> */}
        <PlanetCardContainer page={page} setCount={setCount} search={query} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <CharacterCardContainer
          page={page}
          setCount={setCount}
          search={query}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <StarshipsContainer page={page} setCount={setCount} search={query} />
      </CustomTabPanel>

      <Pagination page={page} setPage={setPage} count={count} />
    </Box>
  );
}
