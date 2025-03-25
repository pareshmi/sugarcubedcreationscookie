import React, { useState, useEffect } from "react";
import Items from "../Items/Items"; // Import Items component
import "./Collection.css";

const Collection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shopItems")) || [];
    setItems(storedItems);
  }, []);

  return (
    <div className="shop">
      <h1>OUR COLLECTION</h1>
      <hr />
      <div className="shop-item">
        {items.length > 0 ? (
          items.map((item, index) => (
            <Items
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>No items available. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
