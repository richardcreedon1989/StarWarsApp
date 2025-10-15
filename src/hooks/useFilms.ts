// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// hooks/useResidents.js
import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

// const fetchFilms = async (movieId) => {
//   console.log("movieId123", movieId);
//   const { data } = await axios.get(`https://swapi.dev/api/films/${movieId}/`);
//   console.log("dataAPO", data);
//   return data;
// };

// export function useFilms(movieId) {
//   return useQuery({
//     queryKey: ["film", movieId],
//     queryFn: () => fetchFilms(movieId),
//     enabled: !!movieId,
//   });
// }

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

async function fetchFilms(info) {
  if (info === undefined || info === null) {
    const { data } = await axios.get("https://swapi.dev/api/films/");
    return data; // { count, next, previous, results: [...] }
  }

  if (info.url) {
    const { data } = await axios.get(info.url);
    return data;
  }
  if (info.id) {
    const { data } = await axios.get(`https://swapi.dev/api/films/${info.id}/`);
    return data;
  }

  throw new Error("No resident identifier provided");
}

// --- single resident -------------------------------------------------------

export function useFilms(residentIdOrUrl) {
  const info = normalizeInput(residentIdOrUrl);
  const enabled = info.key !== "";

  return useQuery({
    queryKey: ["films", info.key],
    queryFn: () => fetchFilms(info),
    enabled,
    staleTime: 60_000,
  });
}

// --- many residents (array) -----------------------------------------------

export function useFilmsMany(idsOrUrls = [], enabled = true) {
  const inputs = useMemo(() => idsOrUrls.map(normalizeInput), [idsOrUrls]);

  return useQueries({
    queries: inputs.map((info) => ({
      queryKey: ["films", info.key],
      queryFn: () => fetchFilms(info),
      enabled: enabled && info.key !== "",
      staleTime: 60_000,
    })),
  });
}

// export function useAllResidents() {
//   return useQuery({
//     queryKey: ["allResidents"],
//     queryFn: () => fetchResident(),
//     staleTime: 60_000,
//   });
// }

// Optional alias if you want old imports to keep working:
// export { useResident as useResidents };
