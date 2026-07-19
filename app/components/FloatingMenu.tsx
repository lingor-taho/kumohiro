"use client";

import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

const items = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

export function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    items.forEach((item) => router.prefetch(item[1]));
    const direction = sessionStorage.getItem("nav-direction");
    if (direction) document.documentElement.dataset.navDirection = direction;
    const timer = window.setTimeout(() => {
      delete document.documentElement.dataset.navDirection;
      sessionStorage.removeItem("nav-direction");
    }, 850);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    if (href === pathname) { setOpen(false); return; }
    const current = items.findIndex((item) => item[1] === pathname);
    const target = items.findIndex((item) => item[1] === href);
    const direction = target > current ? "forward" : "backward";
    sessionStorage.setItem("nav-direction", direction);
    document.querySelector(".site-page")?.classList.add(direction === "forward" ? "leave-left" : "leave-right");
    window.setTimeout(() => router.push(href), 260);
  }
  return (
    <div className={`floating-menu ${open ? "is-open" : ""}`}>
      <div className="menu-side menu-left">
        {items.slice(0, 2).map(([label, href], index) => (
          <a key={href} href={href} onClick={(event) => navigate(event, href)} className={pathname === href ? "active" : ""} style={{ "--order": index } as React.CSSProperties}>
            <span>{label}</span><span aria-hidden="true">{label}</span>
          </a>
        ))}
      </div>
      <button type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation" : "Explore navigation"}>
        <span className="explore-label">Explore</span><span className="close-mark" aria-hidden="true" />
      </button>
      <div className="menu-side menu-right">
        {items.slice(2).map(([label, href], index) => (
          <a key={href} href={href} onClick={(event) => navigate(event, href)} className={pathname === href ? "active" : ""} style={{ "--order": index } as React.CSSProperties}>
            <span>{label}</span><span aria-hidden="true">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
