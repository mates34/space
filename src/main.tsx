import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.scss";
import "./styles/base/globals.scss";
import "./styles/themes/space-theme.scss";
import "./styles/mixins/animations.scss";
import "./sections/Hero/Hero.scss";
import "./sections/About/About.scss";
import "./sections/Features/Features.scss";
import "./sections/Chains/Chains.scss";
import "./components/Layout/Navbar.scss";
import "./components/SaturnPlanet/SaturnPlanet.scss";
import "./components/MoonMapModal/MoonMapModal.scss";
import "./animations/holograms/rocket/RocketHologram.scss";
import "./animations/holograms/rocket/SimpleHologram.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
