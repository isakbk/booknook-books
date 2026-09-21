import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import RatingStars from "../components/RatingStars";
import ProductGrid from "../components/ProductGrid";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === id
  );

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] =
    useState("description");

  if (!product) {
    return (
      <main className="not-found-page">
        <div className="container">
          <h1>Product not found</h1>
          <Link to="/shop" className="btn btn-accent">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    )
    .slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <section className="product-detail">
          <div className="detail-image-box">
            <span className="detail-badge">
              {product.badge}
            </span>

            <img
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="detail-content">
            <span className="product-category">
              {product.category} /{" "}
              {product.subcategory}
            </span>

            <h1>{product.title}</h1>

            {product.author && (
              <p className="detail-author">
                By{" "}
                <Link
                  to={`/author/${product.authorSlug}`}
                >
                  {product.author}
                </Link>
              </p>
            )}

            <RatingStars
              rating={product.rating}
              reviews={product.reviews}
            />

            <div className="detail-price">
              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>

              {product.oldPrice && (
                <del>
                  ₹
                  {product.oldPrice.toLocaleString(
                    "en-IN"
                  )}
                </del>
              )}

              <span className="save-badge">
                Save{" "}
                {Math.round(
                  ((product.oldPrice -
                    product.price) /
                    product.oldPrice) *
                    100
                )}
                %
              </span>
            </div>

            <p className="detail-description">
              {product.description}
            </p>

            <div className="stock-status">
              <span className="stock-dot" />
              {product.stock > 0
                ? `In stock — ${product.stock} available`
                : "Out of stock"}
            </div>

            <div className="purchase-row">
              <div className="quantity-control">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(
                        product.stock,
                        quantity + 1
                      )
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-accent add-detail-btn"
                onClick={handleAdd}
                disabled={!product.stock}
              >
                Add to Cart
              </button>
            </div>

            <div className="detail-benefits">
              <div>
                <span>🚚</span>
                <div>
                  <strong>Free shipping</strong>
                  <small>On orders over ₹999</small>
                </div>
              </div>

              <div>
                <span>↩</span>
                <div>
                  <strong>Easy returns</strong>
                  <small>7 day return policy</small>
                </div>
              </div>

              <div>
                <span>✓</span>
                <div>
                  <strong>Secure checkout</strong>
                  <small>Your data is protected</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="detail-tabs">
          <div className="tabs">
            <button
              className={
                activeTab === "description"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("description")
              }
            >
              Description
            </button>

            <button
              className={
                activeTab === "specifications"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("specifications")
              }
            >
              Specifications
            </button>

            <button
              className={
                activeTab === "reviews"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("reviews")
              }
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div>
                <h3>About this product</h3>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="spec-table">
                <div>
                  <span>Format</span>
                  <strong>{product.format}</strong>
                </div>

                <div>
                  <span>Language</span>
                  <strong>{product.language}</strong>
                </div>

                <div>
                  <span>Publisher</span>
                  <strong>{product.publisher}</strong>
                </div>

                <div>
                  <span>Year</span>
                  <strong>{product.year}</strong>
                </div>

                <div>
                  <span>Pages</span>
                  <strong>
                    {product.pages || "N/A"}
                  </strong>
                </div>

                <div>
                  <span>ISBN</span>
                  <strong>{product.isbn}</strong>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-section">
                {product.reviewsData?.length ? (
                  product.reviewsData.map(
                    (review, index) => (
                      <div
                        className="review-item"
                        key={index}
                      >
                        <div className="review-avatar">
                          {review.name.charAt(0)}
                        </div>

                        <div>
                          <strong>
                            {review.name}
                          </strong>

                          <RatingStars
                            rating={review.rating}
                          />

                          <p>{review.text}</p>

                          <small>
                            {review.date}
                          </small>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No reviews yet. Be the first to
                    review this product.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="section related-section">
          <div className="section-heading-row">
            <div>
              <span className="section-label">
                YOU MAY ALSO LIKE
              </span>

              <h2>Related Products</h2>
            </div>
          </div>

          <ProductGrid products={related} />
        </section>
      </div>
    </main>
  );
}