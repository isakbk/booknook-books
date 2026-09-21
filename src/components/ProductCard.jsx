import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <button
          className="wishlist-button"
          onClick={() => toggleWishlist(product)}
          aria-label={`Add ${product.title} to wishlist`}
        >
          <Heart
            size={20}
            fill={isInWishlist(product.id) ? "currentColor" : "none"}
            className={isInWishlist(product.id) ? "filled" : ""}
          />
        </button>

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </Link>

        <button
          className="quick-add"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.title} to cart`}
        >
          +
        </button>
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category === "books"
            ? product.subcategory
            : product.brand}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        {product.author && (
          <Link
            to={`/author/${product.authorSlug}`}
            className="product-author"
          >
            by {product.author}
          </Link>
        )}

        <RatingStars
          rating={product.rating}
          reviews={product.reviews}
        />

        <div className="product-bottom">
          <div>
            <span className="product-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.oldPrice && (
              <span className="old-price">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}