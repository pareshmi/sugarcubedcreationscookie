import React from "react";
import "./Footer.css";
import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src={logo}
            alt="Logo"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ cursor: "pointer" }}
          />
          <h2
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ cursor: "pointer" }}
          >
            SUGAR CUBED CREATIONS
          </h2>
        </div>

        <ul className="footer-links">
          <li>Company</li>
          <li>Products</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div className="footer-socials">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaPinterest />
          </a>
          <a href="#">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Email Signup */}
      <div className="footer-subscribe">
        <h3>Subscribe for Updates</h3>
        <div className="subscribe-box">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
