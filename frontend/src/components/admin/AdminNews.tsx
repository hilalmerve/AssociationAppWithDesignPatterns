import React from "react"
import { useEffect, useState } from "react";
import { newsApi } from "../../services/api";
import type { News, NewsForm } from "../../types";

const EMPTY_FORM: NewsForm = { title: "", description: "", validUntil: "", newsLink: "" };

export default function AdminNews() {
  const [news, setNews] = useState<News[]>([]);
  const [form, setForm] = useState<NewsForm>(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setNews(await newsApi.getAll());
  };

  useEffect(() => { load(); }, []);

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId !== null) {
        await newsApi.update(editId, form);
        notification("News updated ✓");
      } else {
        await newsApi.create(form);
        notification("News added ✓");
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      load();
    } finally {
      setLoading(false);
    }
  };

  const notification = showMessage;

  const edit = (h: News) => {
    setEditId(h.id);
    setForm({ title: h.title, description: h.description, validUntil: h.validUntil, newsLink: h.newsLink ?? "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    await newsApi.remove(id);
    showMessage("News deleted");
    load();
  };

  const cancel = () => { setForm(EMPTY_FORM); setEditId(null); };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={s.title}>News Management</h1>

      {message && <div style={s.notification}>{message}</div>}

      {/* ─── FORM ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} style={s.card}>
        <h2 style={s.subTitle}>{editId ? "Edit News" : "New News"}</h2>

        <label style={s.label}>Title *</label>
        <input style={s.input} value={form.title} required
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label style={s.label}>Description *</label>
        <textarea style={{ ...s.input, height: 120, resize: "vertical" }} value={form.description} required
          onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <label style={s.label}>Validation Date *</label>
        <input type="date" style={s.input} value={form.validUntil} required
          onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />

        <label style={s.label}>News Link</label>
        <input style={s.input} value={form.newsLink ?? ""} placeholder="https://"
          onChange={(e) => setForm({ ...form, newsLink: e.target.value })} />

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="submit" style={s.btnPrimary} disabled={loading}>
            {loading ? "Saving…" : editId ? "Update" : "Add"}
          </button>
          {editId && <button type="button" style={s.btnSecondary} onClick={cancel}>Cancel</button>}
        </div>
      </form>

      {/* ─── TABLO ────────────────────────────────────────── */}
      <div style={s.card}>
        <h2 style={s.subTitle}>News ({news.length})</h2>
        {news.length === 0
          ? <p style={{ color: "var(--color-text-secondary)" }}>No news yet.</p>
          : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["Title", "Validation", "Link", "Process"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {news.map((h) => (
                  <tr key={h.id} style={s.tr}>
                    <td style={s.td}>{h.title}</td>
                    <td style={s.td}>{h.validUntil}</td>
                    <td style={s.td}>
                      {h.newsLink
                        ? <a href={h.newsLink} target="_blank" rel="noreferrer" style={{ color: "#185FA5" }}>Open</a>
                        : "—"}
                    </td>
                    <td style={s.td}>
                      <button style={s.btnEdit} onClick={() => edit(h)}>Edit</button>
                      <button style={s.btnRemove} onClick={() => remove(h.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

// ─── Inline stiller ───────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  title: { fontSize: 26, fontWeight: 500, marginBottom: 24 },
  subTitle: { fontSize: 18, fontWeight: 500, marginBottom: 16 },
  card: { background: "var(--color-background-secondary)", borderRadius: 12, padding: "1.5rem", marginBottom: 24, border: "1px solid var(--color-border-tertiary)" },
  label: { display: "block", fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 4, marginTop: 12 },
  input: { width: "100%", boxSizing: "border-box", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-border-primary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 14 },
  notification: { background: "var(--color-background-success)", color: "var(--color-text-success)", padding: "10px 16px", borderRadius: 8, marginBottom: 16 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "8px 12px", fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-tertiary)" },
  td: { padding: "10px 12px", fontSize: 14, borderBottom: "1px solid var(--color-border-tertiary)" },
  tr: { transition: "background .15s" },
  btnPrimary: { padding: "8px 20px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  btnSecondary: { padding: "8px 16px", background: "var(--color-background-primary)", border: "1px solid var(--color-border-primary)", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "var(--color-text-primary)" },
  btnEdit: { marginRight: 6, padding: "4px 12px", background: "#E6F1FB", color: "#0C447C", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 },
  btnRemove: { padding: "4px 12px", background: "#FCEBEB", color: "#791F1F", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 },
};