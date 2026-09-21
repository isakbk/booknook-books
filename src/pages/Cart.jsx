import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totals,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <main className="cart-page">
        <div className="container empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/shop"
            className="btn btn-accent"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <div className="page-heading compact">
          <span className="section-label">
            YOUR BAG
          </span>

          <h1>Shopping Cart</h1>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="cart-item-info">
                  <span className="product-category">
                    {item.category}
                  </span>

                  <Link
                    to={`/product/${item.id}`}
                  >
                    {item.title}
                  </Link>

                  {item.author && (
                    <small>
                      by {item.author}
                    </small>
                  )}

                  <strong>
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <strong className="cart-item-total">
                  ₹
                  {(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

                <button
                  className="remove-item"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  aria-label="Remove item"
                >
                  ×
                </button>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Order Summary</h2>

            <div className="coupon-box">
              <label>Promo code</label>

              {coupon ? (
                <div className="active-coupon">
                  <span>{coupon} applied</span>

                  <button
                    onClick={removeCoupon}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="coupon-input">
                  <input
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value)
                    }
                    placeholder="e.g. BOOK10"
                  />

                  <button
                    onClick={() => {
                      if (
                        applyCoupon(couponCode)
                      ) {
                        setCouponCode("");
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}

              <small>
                Try BOOK10 or WELCOME20
              </small>
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
              className="btn btn-accent checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}