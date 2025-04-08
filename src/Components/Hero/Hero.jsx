import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import cookie_home from "../Assets/cookie_home.png";
import offerImage from "../Assets/redvelvet.png"; // Replace with your image path

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="hero">
        <div className="hero-left">
          <h2>A BITE OF DELICIOUSNESS</h2>
          <p>100% NATURAL</p>
          <p>FRESH HOMEMADE COOKIES</p>

          <div className="hero-latest-btn" onClick={() => navigate("/shop")}>
            SHOP NOW
          </div>
        </div>

        <div className="hero-right">
          <img src={cookie_home} alt="Delicious Cookie" />
        </div>
      </div>

      {/* Exclusive Offers Section (Placed BELOW Hero Section) */}
      <div className="exclusive-offers">
        <div className="exclusive-text">
          <h1>
            EXCLUSIVE <br /> OFFERS FOR YOU
          </h1>
          <p>ON OUR BEST SELLERS PRODUCTS</p>
          <button className="offer-btn" onClick={() => navigate("/offers")}>
            Check Now
          </button>
        </div>
        <div className="exclusive-image">
          <img src={offerImage} alt="Exclusive Offer" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
