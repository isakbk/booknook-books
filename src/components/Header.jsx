import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { Search, ShoppingCart, Sun, Moon, Menu, User, Heart } from "lucide-react";

export default function Header() {
  const { itemCount } = useCart();
  const { darkMode, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/shop");
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    setMobileOpen(false);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Free shipping on orders over ₹999</span>
          <span>Premium books & stationery</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-main">
          <Link to="/" className="brand">
            <span className="brand-icon">📖</span>
            <span>
              <strong>BookNook</strong>
              <small>Books & Stationery</small>
            </span>
          </Link>

          <form
            className="header-search"
            onSubmit={submitSearch}
          >
            <Search size={20} />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books, authors, stationery..."
            />

            <button type="submit">Search</button>
          </form>

          <div className="header-actions">
            <Link
              to="/login"
              className="icon-button"
              title="Account"
            >
              <User size={20} />
            </Link>

            <Link
              to="/account"
              className="icon-button"
              title="Wishlist"
            >
              <Heart size={20} />
            </Link>

            <button
              className="icon-button"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/cart"
              className="cart-button"
              title="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="cart-label">Cart</span>

              {itemCount > 0 && (
                <span className="cart-count">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>
          <div className="container nav-inner">
            <NavLink to="/" onClick={closeMobile}>
              Home
            </NavLink>

            <NavLink to="/shop" onClick={closeMobile}>
              Shop
            </NavLink>

            <NavLink to="/shop?category=books" onClick={closeMobile}>
              Books
            </NavLink>

            <NavLink
              to="/shop?category=stationery"
              onClick={closeMobile}
            >
              Stationery
            </NavLink>

            <NavLink to="/authors" onClick={closeMobile}>
              Authors
            </NavLink>

            <NavLink to="/about" onClick={closeMobile}>
              About
            </NavLink>

            <NavLink to="/contact" onClick={closeMobile}>
              Contact
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}