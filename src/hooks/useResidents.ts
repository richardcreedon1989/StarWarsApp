// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchResidents = async (residentsId) => {
//   console.log("hiHere");
//   console.log("movieId123", residentsId);
//   const { data } = await axios.get(
//     `https://swapi.dev/api/people/${residentsId}/`
//   );
//   console.log("dataResidenrts", data);
//   return data;
// };

// export function useResidents(residentsId) {
//   return useQuery({
//     queryKey: ["resident", residentsId],
//     queryFn: () => fetchResidents(residentsId),
//     // enabled: residentsId,
//   });
// }
