import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@app/router/router";
// import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        {/* <App /> */}
        <RouterProvider router={router}/>
    </StrictMode>
);
