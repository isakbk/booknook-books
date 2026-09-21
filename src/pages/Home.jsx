import { Link } from "react-router-dom";
import products from "../data/products";
import categories from "../data/categories";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const bestsellers = products.filter(p => p.badge === "Bestseller").slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="eyebrow">Welcome to BookNook</span>
            <h1>
              Discover Your Next
              <span>Favorite Book</span>
            </h1>
            <p>
              Explore our curated collection of bestselling books, stationery essentials, and creative supplies. From timeless classics to modern masterpieces.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-accent">
                Browse Collection
              </Link>
              <Link to="/about" className="btn btn-outline-light">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>10K+</strong>
                <span>Books Available</span>
              </div>
              <div>
                <strong>50K+</strong>
                <span>Happy Readers</span>
              </div>
              <div>
                <strong>4.9★</strong>
                <span>Average Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-book hero-book-one">
              <span>READ</span>
              <strong>MORE</strong>
            </div>
            <div className="hero-book hero-book-two">
              <span>DREAM</span>
              <strong>BIG</strong>
            </div>
            <div className="hero-circle">📚</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">BROWSE BY</span>
            <h2>Shop Categories</h2>
            <p>Find exactly what you're looking for across our diverse collection</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.id} to={`/shop?category=${category.id}`} className="category-card">
                <div className="category-icon">
                  {category.id === "books" ? "📖" : "✏️"}
                </div>
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.subcategories.length} subcategories</p>
                </div>
                <span className="category-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-label">FEATURED</span>
              <h2>New Arrivals</h2>
            </div>
            <Link to="/shop" className="text-link">
              View All →
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.title} className="product-image" />
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                </div>
                <div className="product-content">
                  <span className="product-category">{product.category}</span>
                  <span className="product-title">{product.title}</span>
                  {product.author && (
                    <span className="product-author">by {product.author}</span>
                  )}
                  <div className="rating">
                    <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
                    <span className="rating-number">{product.rating}</span>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                  <div className="product-bottom">
                    <span className="product-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-label">POPULAR</span>
              <h2>Bestsellers</h2>
            </div>
            <Link to="/shop" className="text-link">
              View All →
            </Link>
          </div>
          <div className="product-grid">
            {bestsellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <span className="product-badge">{product.badge}</span>
                </div>
                <div className="product-content">
                  <span className="product-category">{product.category}</span>
                  <span className="product-title">{product.title}</span>
                  {product.author && (
                    <span className="product-author">by {product.author}</span>
                  )}
                  <div className="rating">
                    <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
                    <span className="rating-number">{product.rating}</span>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                  <div className="product-bottom">
                    <span className="product-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div>
            <span className="section-label">LIMITED TIME</span>
            <h2>Summer Reading Sale</h2>
            <p>Get up to 40% off on selected bestselling titles. Stock up on your summer reading list today!</p>
            <Link to="/shop" className="btn btn-accent" style={{ marginTop: "20px" }}>
              Shop the Sale
            </Link>
          </div>
          <div className="promo-visual">
            <span>📚</span>
            <span>📖</span>
            <span>✨</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">WHY CHOOSE US</span>
            <h2>The BookNook Experience</h2>
          </div>
          <div className="category-grid">
            <div className="category-card" style={{ cursor: "default" }}>
              <div className="category-icon">📦</div>
              <div>
                <h3>Fast Delivery</h3>
                <p>Get your books delivered within 2-5 business days</p>
              </div>
            </div>
            <div className="category-card" style={{ cursor: "default" }}>
              <div className="category-icon">💰</div>
              <div>
                <h3>Best Prices</h3>
                <p>Competitive pricing on all books and stationery</p>
              </div>
            </div>
            <div className="category-card" style={{ cursor: "default" }}>
              <div className="category-icon">🔄</div>
              <div>
                <h3>Easy Returns</h3>
                <p>30-day hassle-free return policy</p>
              </div>
            </div>
            <div className="category-card" style={{ cursor: "default" }}>
              <div className="category-icon">💬</div>
              <div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock customer assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <span className="section-label">STAY UPDATED</span>
            <h2>Join Our Newsletter</h2>
            <p>Subscribe to get updates on new arrivals, special offers, and reading recommendations.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn btn-accent">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
