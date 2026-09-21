import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand footer-logo">
            <span className="brand-icon">📖</span>
            <span>
              <strong>BookNook</strong>
              <small>Books & Stationery</small>
            </span>
          </Link>

          <p>
            Your cozy digital bookstore for books,
            stationery and everything that inspires
            a love of reading.
          </p>

          <div className="social-links">
            <a href="#facebook">f</a>
            <a href="#instagram">◎</a>
            <a href="#twitter">𝕏</a>
            <a href="#youtube">▶</a>
          </div>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?category=books">Books</Link>
          <Link to="/shop?category=stationery">
            Stationery
          </Link>
          <Link to="/shop?sort=rating">
            Best Rated
          </Link>
        </div>

        <div>
          <h4>BookNook</h4>
          <Link to="/about">About Us</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Shopping Cart</Link>
        </div>

        <div>
          <h4>Customer Care</h4>
          <a href="#shipping">Shipping Information</a>
          <a href="#returns">Returns & Refunds</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>
            © {new Date().getFullYear()} BookNook.
            All rights reserved.
          </span>

          <span>
            Made with ♥ for book lovers
          </span>
        </div>
      </div>
    </footer>
  );
}