import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="product-skeleton" key={index}>
            <div className="skeleton-image" />
            <div className="skeleton-line large" />
            <div className="skeleton-line" />
            <div className="skeleton-line small" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="empty-products">
        <div className="empty-icon">📚</div>
        <h3>No products found</h3>
        <p>
          Try changing your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
}