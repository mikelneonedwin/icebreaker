import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import Home from "./pages/home";
import Game from "./pages/game";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import "@/lib/firebase";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VercelAnalytics />
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path=":key" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
