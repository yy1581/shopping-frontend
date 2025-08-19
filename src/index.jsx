import { createRoot } from "react-dom/client";
import "./index.css";
import { LocaleProvider } from "./contexts/LocaleContext.jsx";
import Main from "./main.jsx";

createRoot(document.getElementById("root")).render(
  <LocaleProvider defaultValue={"ko"}>
    <Main />
  </LocaleProvider>
);
