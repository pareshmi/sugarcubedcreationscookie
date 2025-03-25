import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admindash.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Check authentication on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }

    // Load items from localStorage
    const storedItems = JSON.parse(localStorage.getItem("shopItems")) || [];
    setItems(storedItems);
  }, [navigate]);

  // Update localStorage when items change
  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("shopItems", JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  // Toggle Form Display
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    id: null,
    name: "",
    price: "",
    image: "",

    description: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
    setNewItem({ id: null, name: "", price: "", image: "" }); // Reset the input fields
    setNewItem({ id: null, name: "", price: "", image: "", description: "" }); // Reset the input fields
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result }); // Set base64 image data
      };
      reader.readAsDataURL(file); // Convert image to base64 format
    }
  };

  // Add or Update Item
  const submitItem = () => {
    if (newItem.id) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      updateLocalStorage(updatedItems);
    } else {
      // Add new item
      const itemToAdd = {
        id: items.length + 1,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image,
      };
      const updatedItems = [...items, itemToAdd];
      updateLocalStorage(updatedItems);
    }
    setShowForm(false); // Hide the form after adding/updating
  };

  // Start Update Item
  const editItem = (item) => {
    setNewItem(item);
    setShowForm(true); // Show form for editing
  };

  // Delete Item
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    updateLocalStorage(updatedItems);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      {/* Header with Logout Button */}
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

      {/* Conditional Form Display */}
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
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newItem.image && (
            <img src={newItem.image} alt="Preview" className="image-preview" />
          )}
          <button onClick={submitItem}>
            {newItem.id ? "Update" : "Submit"}
          </button>
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
                  <img src={item.image} alt="Item" className="item-image" />
                )}
              </td>
              <td>
                <button className="update-btn" onClick={() => editItem(item)}>
                  Update
                </button>
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
