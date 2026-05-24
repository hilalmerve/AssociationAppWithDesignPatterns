import React from "react"
import { useEffect, useState } from "react";
import { announcementApi, IMAGE_BASE } from "../../services/api";
import { useWebSocket } from "../../hooks/useWebSocket";
import type { Announcement } from "../../types";

export default function UserAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newVar, setNewVar] = useState(false);

  useEffect(() => {
    announcementApi.getAll().then(setAnnouncements);
  }, []);

  /**
   * WebSocket hook: admin new announcement eklediğinde bu callback tetiklenir.
   * New announcement state'in başına eklenerek liste anında güncellenir.
   */
  useWebSocket((newAnnouncement: Announcement) => {
    setAnnouncements((previous) => [newAnnouncement, ...previous]);
    setNewVar(true);
    setTimeout(() => setNewVar(false), 4000);
  });

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <h1 style={s.title}>Announcements</h1>
        {/* Gerçek zamanlı bağlantı göstergesi */}
        <span style={s.badge}>● Live</span>
      </div>

      {newVar && (
        <div style={s.newAlert}>
          🔔 New announcement published!
        </div>
      )}

      {announcements.length === 0 && (
        <p style={{ color: "var(--color-text-secondary)" }}>No announcement yet.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {announcements.map((d) => (
          <div key={d.id} style={s.card}>
            {d.imagePath && (
              <img
                src={`${IMAGE_BASE}/${d.imagePath}`}
                alt={d.subject}
                style={s.image}
              />
            )}
            <div style={s.contentArea}>
              <div style={s.date}>{d.validUntil}</div>
              <h2 style={s.subject}>{d.subject}</h2>
              <p style={s.description}>{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  title: { fontSize: 26, fontWeight: 500, margin: 0 },
  badge: { fontSize: 12, background: "#EAF3DE", color: "#3B6D11", padding: "3px 10px", borderRadius: 99, fontWeight: 500 },
  newAlert: { background: "#EAF3DE", color: "#27500A", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 14, fontWeight: 500, animation: "fadeIn .3s ease" },
  card: { display: "flex", gap: 16, background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" },
  image: { width: 180, height: 140, objectFit: "cover", flexShrink: 0 },
  contentArea: { padding: "1rem", flex: 1 },
  date: { fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6 },
  subject: { fontSize: 17, fontWeight: 500, marginBottom: 8, lineHeight: 1.3 },
  description: { fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 },
};