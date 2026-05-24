import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/news", label: "News" },
  { to: "/announcements", label: "Announcements" },
  { to: "/admin/news", label: "Admin – News" },
  { to: "/admin/announcements", label: "Admin – Announcements" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={s.nav}>
      <span style={s.logo}>Association</span>
            <div style={s.links}>
              {links.map((l) => (
                <Link key={l.to} to={l.to}
                  style={{ ...s.link, ...(pathname === l.to ? s.active : {}) }}>
                  {l.label}
                </Link>
              ))}
            </div>
    </nav>
  );
}

const s: Record<string, React.CSSProperties> = {
  nav: { display: "flex", alignItems: "center", gap: 24, padding: "0 2rem", height: 56, background: "var(--color-background-secondary)", borderBottom: "1px solid var(--color-border-tertiary)", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontWeight: 500, fontSize: 18, marginRight: 16 },
  links: { display: "flex", gap: 4, flexWrap: "wrap" },
  link: { fontSize: 14, color: "var(--color-text-secondary)", textDecoration: "none", padding: "4px 10px", borderRadius: 6 },
  active: { color: "var(--color-text-primary)", background: "var(--color-background-primary)", fontWeight: 500 },
};