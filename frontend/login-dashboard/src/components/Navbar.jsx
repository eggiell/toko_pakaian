import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // dummy login

  return (
    <nav className="navbar">
      <h2 className="navbar-logo" onClick={() => navigate("/")}>
        NJZ Store
      </h2>

      <div className="navbar-menu">
        <button onClick={() => navigate("/produk")}>
          Produk
        </button>

        <button onClick={() => navigate("/admin")}>
          Dashboard Admin
        </button>

        {!isLogin ? (
          <button
            className="login-btn"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        ) : (
          <button
            className="logout-btn"
            onClick={() => setIsLogin(false)}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
