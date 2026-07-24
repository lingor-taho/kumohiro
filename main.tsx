import { createRoot } from "react-dom/client";
import { Experience } from "./app/components/Experience";
import "./app/globals.css";
import "./app/experience.css";
import "./app/parallax.css";
import "./app/content.css";

const routes = ["/", "/about", "/projects", "/contact"];
const initialIndex = Math.max(0, routes.indexOf(window.location.pathname));
const root = document.getElementById("root");

if (!root) throw new Error("Website root element was not found.");

createRoot(root).render(<Experience initialIndex={initialIndex} />);
