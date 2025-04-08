import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import productService from "../Services/productsService";
import "./CSS/ProductDetails.css";



const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ Fetch product from backend
  useEffect(() => {
    // Define the asynchronous function inside useEffect
    const fetchData = async () => {
      const { data, error } = await productService.getProductById(parseInt(productId));
      if(error){
        alert("failed to fetch data");
      }else{
        setProduct(data);
      }
    };
  
    fetchData(); // Call the async function
  }, [productId]);
  const handleAddToCart = () => {
    if (quantity > product.max_order_qty) {
      setError(`You can only order up to ${product.max_order_qty} of this item.`);
      return;
    }
    addToCart({ ...product, quantity });
    setError(""); // Clear error if successful
  };

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
        <p className="price">${product.price}</p>
        {product.old_price && (
          <p className="old-price">Was: ${product.old_price}</p>
        )}

        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              if (quantity < product.max_order_qty) {
                setQuantity(quantity + 1);
                setError(""); // Clear any previous error
              } else {
                setError(`Maximum ${product.max_order_qty} items allowed.`);
              }
            }}
          >
            +
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div className="product-description">
          <h3>Description:</h3>
          <p>
            {product.desc ||
              "Delicious handcrafted cookie made with love and top-quality ingredients."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
