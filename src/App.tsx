import "./styles.css";
import NavigationTabs from "./components/NavigationTabs";
import { EntityDialogProvider } from "./context/EntityDialogContext";
import EntityDialogHost from "./components/Dialog/EntityDialogHost";

export default function App() {
  return (
    <div className="App">
      <EntityDialogProvider>
        <NavigationTabs />
        <EntityDialogHost />
      </EntityDialogProvider>
    </div>
  );
}
