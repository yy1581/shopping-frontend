import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { LocaleProvider } from "./contexts/LocaleContext.jsx";

createRoot(document.getElementById("root")).render(
  <LocaleProvider defaultValue={"ko"}>
    <App />
  </LocaleProvider>
);
