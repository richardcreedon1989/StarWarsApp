import DialogShell from "./DialogShell";
import { useEntityDialog } from "../../context/EntityDialogContext";
import PersonDetails from "../views/PersonDetails";
// import StarshipDetails from "../views/StarshipDetails";
import PlanetDetails from "../views/PlanetDetails";
import StarshipDetails from "../views/StarshipDetails";
export default function EntityDialogHost() {
  const { open, payload, closeEntity } = useEntityDialog();
  const title = payload?.name || (payload?.type ?? "Details");

  let body: JSX.Element | null = null;
  if (payload?.type === "person") body = <PersonDetails url={payload.url} />;
  if (payload?.type === "starship")
    body = <StarshipDetails url={payload.url} />;
  if (payload?.type === "planet") body = <PlanetDetails url={payload.url} />;

  return (
    <DialogShell open={open} title={title} onClose={closeEntity}>
      {body}
    </DialogShell>
  );
}
