import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Updated cart count logic
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          SUGAR CUBED CREATIONS
        </p>
      </div>

      <div
        className="mobile-menu-icon"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      ></div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link
            to="/shop"
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
          >
            SHOP
          </Link>
        </li>
        <li onClick={() => setMenu("offers")}>
          <Link
            to="/offers"
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
          >
            OFFERS
          </Link>
        </li>
        <li onClick={() => setMenu("ourstory")}>
          <Link
            to="/ourstory"
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
          >
            STORY
          </Link>
        </li>
        <li onClick={() => setMenu("blog")}>
          <Link
            to="/blog"
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
          >
            BLOG
          </Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to="/search">
          <input type="text" placeholder="Search..." className="nav-search" />
        </Link>
        <Link to="/loginsignup">
          <button>
            <FaUserShield className="admin-icon" />
          </button>
        </Link>
        <Link to="/cart">
          <div className="nav-cart" style={{ position: "relative" }}>
            <img src={cart_icon} alt="Cart" />
            {totalQuantity > 0 && (
              <div className="nav-cart-count">{totalQuantity}</div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
