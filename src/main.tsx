import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.css";
import { TaskProvider } from "./contexts/task-organizerly.tsx";

createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
