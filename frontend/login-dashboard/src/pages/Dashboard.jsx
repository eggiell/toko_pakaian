import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "../style.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="store-title">NJZ Store</h1>
        <p className="store-subtitle">Pilih outfit favorit kamu!</p>

        <div className="product-grid">
          <ProductCard name="Kaos Oversize" price="120.000" />
          <ProductCard name="Kemeja Flanel" price="180.000" />
          <ProductCard name="Hoodie NewJeans" price="250.000" />
          <ProductCard name="Celana Jeans" price="200.000" />
          <ProductCard name="Rok Mini" price="150.000" />
          <ProductCard name="Topi Denim" price="90.000" />
          <ProductCard name="Kalung Silver" price="110.000" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
