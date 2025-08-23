import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { measureWebVitals } from "./utils/performance";

createRoot(document.getElementById("root")!).render(<App />);

// Start performance monitoring
measureWebVitals();
