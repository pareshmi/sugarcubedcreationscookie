import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "./CSS/ProductDetails.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shopItems")) || [];
    const foundProduct = storedItems.find(
      (item) => item.id === parseInt(productId)
    );
    setProduct(foundProduct);
  }, [productId]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const navigate = useNavigate();

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-container">
      <div className="left-column">
        <button className="back-button" onClick={() => navigate("/shop")}>
          ← Back to Collection
        </button>
        <img src={product.image} alt={product.name} className="main-image" />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.new_price}</p>
        {product.old_price && (
          <p className="old-price">Was: ${product.old_price}</p>
        )}
        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <div className="product-description">
          <h3>Description:</h3>
          <p>
            {product.description ||
              "Delicious handcrafted cookie made with love and top-quality ingredients."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
