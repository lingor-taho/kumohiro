"use client";

import { useEffect, useRef, useState } from "react";
import PlanetScene from "./PlanetScene";

const routes = ["/", "/about", "/projects", "/contact"] as const;
const labels = ["Home", "About", "Projects", "Contact"];

function HomePanel() {
  return (
    <section className="scene scene-home">
      <div className="scene-media media-home" aria-hidden="true"><PlanetScene /></div>
      <header className="topline">
        <span>North & East / Trading studio</span>
        <span>Tokyo / Singapore</span>
      </header>
      <div className="editorial">
        <p className="kicker">Welcome to North & East</p>
        <h1>
          A trading studio for
          <br />
          objects, ingredients
          <br />
          and new possibilities.
        </h1>
        <div className="editorial-foot">
          <p>
            We connect thoughtful makers with markets across borders and
            disciplines.
          </p>
          <span className="letter-link">Discover our world</span>
        </div>
      </div>
    </section>
  );
}

function AboutPanel() {
  return (
    <section className="scene scene-about">
      <div className="scene-media media-about" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>North & East</span>
        <span>About / 01</span>
      </header>
      <div className="editorial">
        <p className="kicker">Independent / Cross-cultural</p>
        <h1>
          Shaping connections
          <br />
          through insight,
          <br />
          trust and movement.
        </h1>
        <div className="editorial-foot">
          <p>
            A Japan-based studio creating lasting relationships between people,
            products and places.
          </p>
          <span className="letter-link">View our services</span>
        </div>
      </div>
    </section>
  );
}

function ProjectsPanel() {
  const projects = [
    "Everyday objects",
    "Food culture",
    "Industrial futures",
    "Market entry",
  ];
  return (
    <section className="scene scene-projects">
      <div className="scene-media media-projects" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>North & East</span>
        <span>Projects / 02</span>
      </header>
      <div className="editorial">
        <p className="kicker">Selected directions</p>
        <h1>
          Work across objects,
          <br />
          food, industry
          <br />
          and new markets.
        </h1>
        <div className="editorial-foot">
          <p>
            Selected collaborations across sourcing, strategy and international
            distribution.
          </p>
          <span className="letter-link">View selected work</span>
        </div>
      </div>
      <div className="project-ghost">
        {projects.map((project, index) => (
          <span key={project}>
            0{index + 1} / {project}
          </span>
        ))}
      </div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="scene scene-contact">
      <div className="scene-media media-contact" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>North & East</span>
        <span>Contact / 03</span>
      </header>
      <div className="editorial">
        <p className="kicker">Tokyo / Available worldwide</p>
        <h1>
          Drink e-coffee
          <br />
          with us.
        </h1>
        <div className="editorial-foot">
          <p>
            Have a product, a market or an idea? We would love to hear about it.
          </p>
          <a className="letter-link" href="mailto:hello@north-east.jp">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}

const panels = [HomePanel, AboutPanel, ProjectsPanel, ContactPanel];

export function Experience({ initialIndex = 0 }: { initialIndex?: number }) {
  const [active, setActive] = useState(initialIndex);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [open, setOpen] = useState(false);
  const timers = useRef<number[]>([]);
  const activeRef = useRef(initialIndex);
  const rootRef = useRef<HTMLElement>(null);
  const pointerFrame = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const onPop = () => {
      const index = Math.max(
        0,
        routes.indexOf(window.location.pathname as (typeof routes)[number]),
      );
      if (index !== activeRef.current) changeScene(index, false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function changeScene(target: number, updateHistory = true) {
    if (target === active) {
      setOpen(false);
      return;
    }
    const nextDirection = target > active ? "forward" : "backward";
    setOpen(false);
    timers.current.push(
      window.setTimeout(() => {
        setDirection(nextDirection);
        setPrevious(active);
        setActive(target);
        if (updateHistory) window.history.pushState({}, "", routes[target]);
        timers.current.push(window.setTimeout(() => setPrevious(null), 920));
      }, 260),
    );
  }

  function moveBackground(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      rootRef.current?.style.setProperty("--mx", x.toFixed(3));
      rootRef.current?.style.setProperty("--my", y.toFixed(3));
    });
  }

  function resetBackground() {
    rootRef.current?.style.setProperty("--mx", "0");
    rootRef.current?.style.setProperty("--my", "0");
  }

  return (
    <main
      ref={rootRef}
      className="experience"
      onPointerMove={moveBackground}
      onPointerLeave={resetBackground}
    >
      {panels.map((Panel, index) => {
        const isActive = index === active;
        const isPrevious = index === previous;
        const className =
          isActive && previous !== null
            ? `scene-wrap enter-${direction}`
            : isPrevious
              ? `scene-wrap exit-${direction}`
              : `scene-wrap${isActive ? " current" : ""}`;
        return (
          <div className={className} key={index} aria-hidden={!isActive}>
            <Panel />
          </div>
        );
      })}
      <div className={`floating-menu ${open ? "is-open" : ""}`}>
        <div className="menu-side menu-left">
          {labels.slice(0, 2).map((label, index) => (
            <button
              key={label}
              className={active === index ? "active" : ""}
              onClick={() => changeScene(index)}
              style={{ "--order": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Explore navigation"}
        >
          <span className="explore-label">Explore</span>
          <span className="close-mark" />
        </button>
        <div className="menu-side menu-right">
          {labels.slice(2).map((label, index) => (
            <button
              key={label}
              className={active === index + 2 ? "active" : ""}
              onClick={() => changeScene(index + 2)}
              style={{ "--order": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
