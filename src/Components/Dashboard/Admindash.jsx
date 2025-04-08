import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admindash.css";
import AuthenticationService from "../../Services/authenticationService";
import productService from "../../Services/productsService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
  });

  // ✅ Fetch items from backend on load
  useEffect(() => {
    // Fetch products from API
    const fetchData = async () => {
      // Check authentication on component mount
      const isLoggedIn = AuthenticationService.isLoggedIn();
      if (!isLoggedIn) {
        navigate("/login");
      }
      const { data, error } = await productService.getProducts();
      if (error) {
        alert("failed to fetch products");
      } else {
        setItems(data); // Update state using setItems
      }
    };
    fetchData();
  }, [navigate]);

  // ✅ Toggle add form
  const toggleForm = () => {
    setShowForm(!showForm);
    setNewItem({
      name: "",
      price: "",
      image: "",
      desc: "",
      max_order_qty: 1,
    });
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit new item to backend
  // Add or Update Item
  const submitItem = async () => {
    if (newItem.id) {
      // Update existing item
      const { data, error } = await productService.updateProduct(
        newItem.id,
        newItem
      );
      if (error) {
        alert("product update failed");
      } else {
        const updatedItems = items.map((item) =>
          item.id === newItem.id ? newItem : item
        );
        setItems(updatedItems);
      }
    } else {
      // Add new item
      const addNewProduct = async () => {
        console.log("item is ", newItem);
        const { error } = productService.createProduct(newItem);
        if (error) {
          alert("failed to add new product");
        } else {
          const updatedItems = [...items, newItem];
          setItems(updatedItems);
          // Hide the form after adding/updating
          setShowForm(false);
        }
      };
      addNewProduct();
    }
  };

  // ✅ Delete item from backend
  const deleteItem = async (id) => {
    const { data, error } = await productService.deleteProduct(id);
    if (error) {
      alert("failed to detete product");
    } else {
      // Refresh list
      const { data, error } = await productService.getProducts();
      if (error) {
        alert("failed to fetch products");
      } else {
        setItems(data);
      }
    }
  };

  const handleLogout = async () => {
    var result = await AuthenticationService.signOut();
    if (result) {
      navigate("/login");
    } else {
      alert("Failed to logout");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Buttons */}
      <div className="admin-actions">
        <button className="add-btn" onClick={toggleForm}>
          {showForm ? "Cancel" : "Add Item"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.desc}
            onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
          />
          <input
            type="text"
            placeholder="Max Quantity / Order"
            value={newItem.max_order_qty}
            onChange={(e) =>
              setNewItem({ ...newItem, max_order_qty: e.target.value })
            }
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newItem.image && (
            <img src={newItem.image} alt="Preview" className="image-preview" />
          )}
          <button onClick={submitItem}>Submit</button>
        </div>
      )}

      {/* Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Max Qty/Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                {item.image && (
                  <img
                    src={item.image}
                    alt="Item"
                    className="item-image"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </td>{" "}
              <td>{item.max_order_qty}</td>
              <td>
                {/* You can add edit later if needed */}
                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
