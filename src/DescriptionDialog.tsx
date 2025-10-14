// import * as React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import { useResident } from "./hooks/useResidentsTest"; // your hook (JS version)
// // import { useStarshipsMany } from "./hooks/useStarships"; // your hook (JS version)
// import { useFilmsMany } from "./hooks/useFilms"; // your hook (JS version)
// import { useResidentsFilms } from "./hooks/useResidentsFilms";
// import { useStarshipsMany } from "./hooks/useStarships";

// export default function DescriptionDialog({
//   open,
//   residentUrl,
//   onClose,
//   initialName,
//   filmNames,
// }) {
//   const { titles } = useResidentsFilms(residentUrl, open);
//   const joinedTitles = titles.join(", ");

//   const activeUrl = open ? residentUrl : null; // don’t fetch when closed

//   const { data, isLoading, isError } = useResident(activeUrl);
//   const starshipsUrls = data?.starships;

//   const starshipNames = useStarshipsMany(starshipsUrls);
//   const names = (starshipNames ?? []).map((q) => q.data?.name).filter(Boolean); // ["X-wing", "Millennium Falcon", ...]

//   const joinedStarships = names.join(", ");

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>
//         {isLoading ? initialName || "Loading…" : isError ? "Error" : data?.name}
//       </DialogTitle>
//       <Divider />
//       <DialogContent dividers>
//         {isLoading && <Typography>Fetching resident…</Typography>}
//         {isError && (
//           <Typography color="error">Couldn’t load this resident.</Typography>
//         )}
//         {data && !isLoading && !isError && (
//           <>
//             <Typography>Name: {data.name}</Typography>
//             <Typography>Homeworld: {data.homeworld}</Typography>
//             <Typography>Films:{joinedTitles}</Typography>
//             <Typography>Starships: {joinedStarships}</Typography>
//             {/* Add more fields as needed */}
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
