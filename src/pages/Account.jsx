import { Link } from "react-router-dom";
import { useState } from "react";

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="account-page">
      <div className="container">
        <div className="page-heading compact">
          <h1>My Account</h1>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-user">
              <div className="user-avatar">JD</div>
              <div>
                <strong>John Doe</strong>
                <small>john@example.com</small>
              </div>
            </div>

            <nav className="account-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`account-nav-item ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            <Link to="/login" className="btn btn-outline" style={{ width: "100%" }}>
              Sign Out
            </Link>
          </aside>

          <main className="account-content">
            {activeTab === "profile" && (
              <div className="account-section">
                <h2>Profile Information</h2>
                <form className="account-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" defaultValue="John" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <button type="submit" className="btn btn-accent">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="account-section">
                <h2>Order History</h2>
                <div className="order-list">
                  <div className="order-item">
                    <div className="order-header">
                      <div>
                        <strong>Order #BK-123456</strong>
                        <small>Placed on Sep 15, 2026</small>
                      </div>
                      <span className="order-status delivered">Delivered</span>
                    </div>
                    <div className="order-items">
                      <span>3 items</span>
                      <strong>₹1,299</strong>
                    </div>
                    <Link to="/order/BK-123456" className="text-link">
                      View Order Details →
                    </Link>
                  </div>
                  <div className="order-item">
                    <div className="order-header">
                      <div>
                        <strong>Order #BK-123457</strong>
                        <small>Placed on Sep 10, 2026</small>
                      </div>
                      <span className="order-status shipped">Shipped</span>
                    </div>
                    <div className="order-items">
                      <span>2 items</span>
                      <strong>₹849</strong>
                    </div>
                    <Link to="/order/BK-123457" className="text-link">
                      View Order Details →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="account-section">
                <h2>My Wishlist</h2>
                <p className="empty-wishlist">Your wishlist is empty.</p>
                <Link to="/shop" className="btn btn-accent">
                  Browse Products
                </Link>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="account-section">
                <h2>Saved Addresses</h2>
                <div className="address-list">
                  <div className="address-card">
                    <div className="address-header">
                      <strong>Home</strong>
                      <span className="address-badge">Default</span>
                    </div>
                    <p>
                      John Doe<br />
                      123 Main Street, Apt 4B<br />
                      Mumbai, Maharashtra 400001<br />
                      India<br />
                      +91 98765 43210
                    </p>
                    <div className="address-actions">
                      <button className="text-link">Edit</button>
                      <button className="text-link" style={{ color: "var(--danger)" }}>Delete</button>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ marginTop: "20px" }}>
                  + Add New Address
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="account-section">
                <h2>Account Settings</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div>
                      <strong>Email Notifications</strong>
                      <small>Receive updates about orders and promotions</small>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div>
                      <strong>SMS Notifications</strong>
                      <small>Get order updates via SMS</small>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div>
                      <strong>Two-Factor Authentication</strong>
                      <small>Add an extra layer of security</small>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                <div className="danger-zone">
                  <h3>Danger Zone</h3>
                  <button className="btn btn-outline" style={{ borderColor: "var(--danger)", color: "var(--danger)" }}>
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
