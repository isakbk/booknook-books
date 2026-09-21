import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const {
    cart,
    totals,
    clearCart,
    showToast,
  } = useCart();

  const navigate = useNavigate();

  const [processing, setProcessing] =
    useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "cod",
  });

  const updateForm = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      showToast(
        "Enter a valid 10-digit Indian phone number",
        "error"
      );
      return;
    }

    if (!/^\d{6}$/.test(form.zip)) {
      showToast(
        "Enter a valid 6-digit PIN code",
        "error"
      );
      return;
    }

    setProcessing(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    const orderNumber =
      "BN" +
      Date.now().toString().slice(-8);

    localStorage.setItem(
      "booknook_last_order",
      JSON.stringify({
        orderNumber,
        customer: form,
        total: totals.total,
        items: cart,
        date: new Date().toISOString(),
      })
    );

    clearCart();

    navigate(
      `/order-success?order=${orderNumber}`
    );
  };

  if (!cart.length) {
    return (
      <main className="empty-page">
        <div className="container">
          <h1>No items to checkout</h1>

          <Link
            to="/shop"
            className="btn btn-accent"
          >
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <span className="section-label">
            SECURE CHECKOUT
          </span>

          <h1>Complete Your Order</h1>

          <div className="checkout-steps">
            <span className="active">1. Details</span>
            <span>2. Payment</span>
            <span>3. Confirmation</span>
          </div>
        </div>

        <form
          className="checkout-layout"
          onSubmit={submitOrder}
        >
          <div className="checkout-form">
            <section className="checkout-card">
              <h2>Contact Information</h2>

              <div className="form-grid">
                <label>
                  First Name
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  Last Name
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    maxLength="10"
                    value={form.phone}
                    onChange={updateForm}
                    placeholder="10 digit mobile number"
                    required
                  />
                </label>
              </div>
            </section>

            <section className="checkout-card">
              <h2>Delivery Address</h2>

              <div className="form-grid">
                <label className="full">
                  Address
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={updateForm}
                    rows="3"
                    required
                  />
                </label>

                <label>
                  City
                  <input
                    name="city"
                    value={form.city}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  State
                  <input
                    name="state"
                    value={form.state}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  PIN Code
                  <input
                    name="zip"
                    maxLength="6"
                    value={form.zip}
                    onChange={updateForm}
                    required
                  />
                </label>
              </div>
            </section>

            <section className="checkout-card">
              <h2>Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={updateForm}
                />

                <span>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <small>
                    Pay when your order arrives.
                  </small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={form.payment === "upi"}
                  onChange={updateForm}
                />

                <span>
                  <strong>UPI</strong>

                  <small>
                    Mock UPI payment for demo.
                  </small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={
                    form.payment === "card"
                  }
                  onChange={updateForm}
                />

                <span>
                  <strong>Credit / Debit Card</strong>

                  <small>
                    Mock card payment for demo.
                  </small>
                </span>
              </label>
            </section>
          </div>

          <aside className="checkout-summary">
            <h2>Your Order</h2>

            <div className="checkout-items">
              {cart.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div>
                    <strong>{item.title}</strong>
                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}
            </div>

            <div className="summary-lines">
              <div>
                <span>Subtotal</span>
                <strong>
                  ₹
                  {totals.subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Discount</span>
                <strong className="discount">
                  - ₹
                  {totals.discount.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>
                  {totals.shipping === 0
                    ? "FREE"
                    : `₹${totals.shipping}`}
                </strong>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹
                {totals.total.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </strong>
            </div>

            <button
              type="submit"
              className="btn btn-accent checkout-btn"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="spinner" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="secure-note">
              🔒 Your checkout information is
              securely processed.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}