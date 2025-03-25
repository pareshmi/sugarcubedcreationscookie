import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

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
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
            to="/shop"
          >
            SHOP
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("offers");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
            to="/offers"
          >
            OFFERS
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("ourstory");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
            to="/ourstory"
          >
            STORY
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("blog");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
            to="/blog"
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
            {" "}
            <FaUserShield className="admin-icon" /> {/* Admin icon */}
          </button>
        </Link>
        <Link to="/cart">
          <div className="nav-cart">
            <img src={cart_icon} alt="Cart" />
            <div className="nav-cart-count">{cartCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
