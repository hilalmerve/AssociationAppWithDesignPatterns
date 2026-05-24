import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: 220,
        background: "#111",
        color: "#fff",
        padding: 20
      }}>
        <h3>Admin Panel</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/admin/news">News</Link>
          <Link to="/admin/announcements">Announcements</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>

    </div>
  );
}