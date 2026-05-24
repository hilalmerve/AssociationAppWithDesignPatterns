import React from "react"
import { useEffect, useRef, useState } from "react";
import { announcementApi, IMAGE_BASE } from "../../services/api";
import type { Announcement } from "../../types";
import { useWebSocket } from "../../hooks/useWebSocket";

interface FormState {
  title: string; description: string; validUntil: string;
}
const EMPTY: FormState = { title: "", description: "", validUntil: "" };

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [image, setImage] = useState<File | undefined>();
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useWebSocket((a) => {
    setAnnouncements(prev => [a, ...prev]);
  });

  const load = async () => setAnnouncements(await announcementApi.getAll());

  useEffect(() => { load(); }, []);

  const notification = (m: string) => {
    setMessage(m); setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId !== null) {
        await announcementApi.update(editId, form.title, form.description, form.validUntil, image);
        notification("Announcement updated ✓");
      } else {
        await announcementApi.create(form.title, form.description, form.validUntil, image);
        notification("Announcement added ✓ — WebSocket ile kullanıcıs bilgilendirildi");
      }
      setForm(EMPTY); setImage(undefined); setEditId(null);
      if (fileRef.current) fileRef.current.value = "";
      load();
    } finally {
      setLoading(false);
    }
  };

  const edit = (d: Announcement) => {
    setEditId(d.id);
    setForm({ title: d.title, description: d.description, validUntil: d.validUntil });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: number) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    await announcementApi.remove(id);
    notification("Announcement removed");
    load();
  };

  const cancel = () => { setForm(EMPTY); setImage(undefined); setEditId(null); };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={s.title}>Announcement Management</h1>

      {message && <div style={s.notification}>{message}</div>}

      {/* ─── FORM ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} style={s.card}>
        <h2 style={s.altTitle}>{editId ? "Announcement Edit" : "New Announcement"}</h2>
        <p style={s.description}>
          {editId
            ? "Update the fields and save."
            : "When a new announcement is saved, a real-time notification is sent to all users via WebSocket."}
        </p>

        <label style={s.label}>Title *</label>
        <input style={s.input} value={form.title} required
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label style={s.label}>Description *</label>
        <textarea style={{ ...s.input, height: 120, resize: "vertical" }} value={form.description} required
          onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <label style={s.label}>Validation Date *</label>
        <input type="date" style={s.input} value={form.validUntil} required
          onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />

        <label style={s.label}>Image {editId ? "(select to change)" : ""}</label>
        <input ref={fileRef} type="file" accept="image/*" style={s.input}
          onChange={(e) => setImage(e.target.files?.[0])} />

        {image && (
          <img src={URL.createObjectURL(image)} alt="preview"
            style={{ marginTop: 8, maxHeight: 120, borderRadius: 8, objectFit: "cover" }} />
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="submit" style={s.btnPrimary} disabled={loading}>
            {loading ? "Saving…" : editId ? "Update" : "Add Announcement"}
          </button>
          {editId && <button type="button" style={s.btnSecondary} onClick={cancel}>Cancel</button>}
        </div>
      </form>

      {/* ─── LISTE ────────────────────────────────────────── */}
      <div style={s.card}>
        <h2 style={s.altTitle}>Announcements ({announcements.length})</h2>
        {announcements.length === 0
          ? <p style={{ color: "var(--color-text-secondary)" }}>No nnouncement yet.</p>
          : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {announcements.map((d) => (
                <div key={d.id} style={s.rowCard}>
                  {d.imagePath && (
                    <img src={`${IMAGE_BASE}/${d.imagePath}`} alt={d.title}
                      style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{d.title}</div>
                    <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>
                      Validation: {d.validUntil}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button style={s.btnEdit} onClick={() => edit(d)}>Edit</button>
                    <button style={s.btnRemove} onClick={() => remove(d.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  title: { fontSize: 26, fontWeight: 500, marginBottom: 24 },
  altTitle: { fontSize: 18, fontWeight: 500, marginBottom: 8 },
  description: { fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 12 },
  card: { background: "var(--color-background-secondary)", borderRadius: 12, padding: "1.5rem", marginBottom: 24, border: "1px solid var(--color-border-tertiary)" },
  label: { display: "block", fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 4, marginTop: 12 },
  input: { width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border-primary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 14 },
  notification: { background: "var(--color-background-success)", color: "var(--color-text-success)", padding: "10px 16px", borderRadius: 8, marginBottom: 16 },
  rowCard: { display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "var(--color-background-primary)", borderRadius: 8, border: "1px solid var(--color-border-tertiary)" },
  btnPrimary: { padding: "8px 20px", background: "#0F6E56", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  btnSecondary: { padding: "8px 16px", background: "var(--color-background-primary)", border: "1px solid var(--color-border-primary)", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "var(--color-text-primary)" },
  btnEdit: { padding: "4px 12px", background: "#E1F5EE", color: "#085041", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 },
  btnRemove: { padding: "4px 12px", background: "#FCEBEB", color: "#791F1F", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 },
};