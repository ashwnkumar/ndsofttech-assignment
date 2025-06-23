import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "./contexts/GlobalContext";
import Loader from "./components/Loader";

createRoot(document.getElementById("root")).render(
  <>
    {/* <StrictMode> */}
      <GlobalProvider>
        <RouterProvider router={router} />
        <Toaster toastOptions={{ style: { zIndex: 9999 } }} />
        <Loader/>
      </GlobalProvider>
    {/* </StrictMode> */}
  </>
);
