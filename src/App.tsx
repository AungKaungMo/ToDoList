import AlertPopup from "./components/Main/Shared/AlertPopup";
import { AlertProvider } from "./context/AlertContext";
import { TaskProvider } from "./context/TaskContext";
import Routes from "./routes";

function App() {
  return (
    <AlertProvider>
      <AlertPopup />
      <TaskProvider>
        <Routes />
      </TaskProvider>
    </AlertProvider>
  );
}

export default App;
