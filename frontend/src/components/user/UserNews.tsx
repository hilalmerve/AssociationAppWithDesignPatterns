import React from "react"
import { useEffect, useState } from "react";
import { newsApi } from "../../services/api";
import type { News } from "../../types";

export default function UserNews() {
  const [news, setNews] = useState<News[]>([]);
  const [selected, setSelected] = useState<News | null>(null);

  useEffect(() => {
    newsApi.getAll().then(setNews);
  }, []);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={s.title}>News</h1>

      {news.length === 0 && (
        <p style={{ color: "var(--color-text-secondary)" }}>No news yet.</p>
      )}

      <div style={s.grid}>
        {news.map((h) => (
          <div key={h.id} style={s.card} onClick={() => setSelected(h)}>
            <div style={s.date}>{h.validUntil}</div>
            <h2 style={s.subject}>{h.subject}</h2>
            <p style={s.summary}>{h.description.slice(0, 120)}{h.description.length > 120 ? "…" : ""}</p>
            <span style={s.more}>Read More→</span>
          </div>
        ))}
      </div>

      {/* ─── POPUP MODAL ──────────────────────────────── */}
      {selected && (
        <div style={s.overlay} onClick={() => setSelected(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <button style={s.close} onClick={() => setSelected(null)}>✕</button>
            <div style={s.modalDate}>{selected.validUntil}</div>
            <h2 style={s.modalTitle}>{selected.title}</h2>
            <p style={s.modalDescription}>{selected.description}</p>
            {selected.newsLink && (
              <a href={selected.newsLink} target="_blank" rel="noreferrer" style={s.link}>
                Go to the news source →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  title: { fontSize: 26, fontWeight: 500, marginBottom: 24 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
  card: { background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem", cursor: "pointer", transition: "transform .15s, box-shadow .15s" },
  date: { fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 },
  subject: { fontSize: 16, fontWeight: 500, marginBottom: 8, lineHeight: 1.4 },
  summary: { fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 12 },
  more: { fontSize: 13, color: "#185FA5", fontWeight: 500 },
  // Modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" },
  modal: { background: "var(--color-background-primary)", borderRadius: 16, padding: "2rem", maxWidth: 600, width: "100%", maxHeight: "80vh", overflowY: "auto", position: "relative" },
  close: { position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--color-text-secondary)", lineHeight: 1 },
  modalDate: { fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 },
  modalTitle: { fontSize: 22, fontWeight: 500, marginBottom: 16, lineHeight: 1.3 },
  modalDescription: { fontSize: 15, lineHeight: 1.7, color: "var(--color-text-primary)", marginBottom: 20 },
  link: { display: "inline-block", padding: "8px 16px", background: "#E6F1FB", color: "#0C447C", borderRadius: 8, fontSize: 14, textDecoration: "none" },
};