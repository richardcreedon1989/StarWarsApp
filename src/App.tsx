import "./styles.css";
import NavigationTabs from "./components/NavigationTabs";
import Card from "./Card";
import CardContainer from "./CardContainer";
import DescriptionDialog from "./DescriptionDialog";
import React from "react";
import { useFilmsMany } from "./hooks/useFilms";
import { useResident } from "./hooks/useResidentsTest";
import { EntityDialogProvider } from "./context/EntityDialogContext";
import EntityDialogHost from "./components/dialog/EntityDialogHost";

export default function App() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogUrl, setDialogUrl] = React.useState(null);
  const [dialogName, setDialogName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = React.useState(null);
  const [selectedName, setSelectedName] = React.useState("");
  const [residentUrl, setResidentUrl] = React.useState("");
  const [residentsFilms, setResidentsFilms] = React.useState("");

  function openResident(url, name, e) {
    e?.preventDefault?.();
    setResidentUrl(url);
    setDialogUrl(url);
    setDialogName(name || "");
    setDialogOpen(true);
    setOpen(true);
  }

  return (
    <div className="App">
      <EntityDialogProvider>
        <NavigationTabs />
        <EntityDialogHost />
      </EntityDialogProvider>
      {/* <BasicTabs onOpenResident={openResident} /> */}
      {/* <DescriptionDialog
        openResident={openResident}
        open={open}
        residentUrl={residentUrl}
        initialName={name}
        onClose={() => setOpen(false)}
        // filmNames={joinedTitles}
      /> */}
      {/* <PlanetCardContainer />
      <CardContainer />
      <PlanetCardContainer planet={data?.results ?? []} /> */}
    </div>
  );
}
