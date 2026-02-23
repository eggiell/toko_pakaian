import Navbar from "../components/Navbar";
import "../style.css";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="admin-dashboard">
        <h1 className="admin-title">Dashboard Admin</h1>
        <p className="admin-subtitle">Ringkasan aktivitas toko hari ini</p>

        {/* SUMMARY CARDS */}
        <div className="admin-cards">
          <div className="admin-card">
            <h3>📦 Total Produk</h3>
            <p className="admin-number">7</p>
          </div>

          <div className="admin-card">
            <h3>🛒 Total Pesanan</h3>
            <p className="admin-number">124</p>
          </div>

          <div className="admin-card">
            <h3>👤 Admin Aktif</h3>
            <p className="admin-number">3</p>
          </div>

          <div className="admin-card">
            <h3>⭐ Ulasan</h3>
            <p className="admin-number">56</p>
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="admin-panel">
          <h2>📊 Statistik Singkat</h2>
          <ul>
            <li>Produk terlaris: <b>Hoodie NewJeans</b></li>
            <li>Kategori terpopuler: <b>Atasan</b></li>
            <li>Stok hampir habis: <b>Rok Mini</b></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
