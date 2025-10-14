// hooks/useResidents.js
import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

// --- helpers ---------------------------------------------------------------

function isUrl(input) {
  return /^https?:\/\//i.test(input);
}

function getIdFromUrl(url) {
  const m = url.match(/people\/(\d+)\/?$/);
  return m ? m[1] : null;
}

function normalizeInput(input) {
  if (input === null || input === undefined) return { key: "" };
  const s = String(input).trim();
  if (!s) return { key: "" };

  if (isUrl(s)) {
    return { key: s, url: s, id: getIdFromUrl(s) || undefined };
  }
  return { key: s, id: s };
}

async function fetchStarship(info) {
  if (info === undefined || info === null) {
    const { data } = await axios.get("https://swapi.dev/api/starships/");
    return data; // { count, next, previous, results: [...] }
  }

  if (info.url) {
    const { data } = await axios.get(info.url);
    return data;
  }
  if (info.id) {
    const { data } = await axios.get(
      `https://swapi.dev/api/starships/${info.id}/`
    );
    return data;
  }

  throw new Error("No resident identifier provided");
}

// --- single resident -------------------------------------------------------

export function useStarship(starshipIdOrUrl) {
  const info = normalizeInput(starshipIdOrUrl);
  const enabled = info.key !== "";

  return useQuery({
    queryKey: ["starship", info.key],
    queryFn: () => fetchStarship(info),
    enabled,
    staleTime: 60_000,
  });
}

// --- many residents (array) -----------------------------------------------

export function useStarshipsMany(idsOrUrls = [], enabled = true) {
  const inputs = useMemo(() => idsOrUrls.map(normalizeInput), [idsOrUrls]);
  console.log("idsOrUrls", idsOrUrls);
  console.log("inputs", inputs);

  return useQueries({
    queries: inputs.map((info) => ({
      queryKey: ["starship", info.key],
      queryFn: () => fetchStarship(info),
      enabled: enabled && info.key !== "",
      staleTime: 60_000,
    })),
  });
}

export function useAllStarships() {
  return useQuery({
    queryKey: ["allStarships"],
    queryFn: () => fetchStarship(),
    staleTime: 60_000,
  });
}

// Optional alias if you want old imports to keep working:
// export { useResident as useResidents };
