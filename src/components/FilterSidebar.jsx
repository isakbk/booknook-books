import categories from "../data/categories";

export default function FilterSidebar({ filters, setFilters }) {
  const selectedCategory = categories.find(
    (cat) => cat.id === filters.category
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h3>Categories</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              checked={filters.category === "all"}
              onChange={() =>
                setFilters({ ...filters, category: "all", subcategory: "all" })
              }
            />
            <span>All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.id}
                onChange={() =>
                  setFilters({ ...filters, category: category.id, subcategory: "all" })
                }
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedCategory && selectedCategory.subcategories && (
        <div className="filter-section">
          <h3>Subcategories</h3>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="subcategory"
                checked={filters.subcategory === "all"}
                onChange={() =>
                  setFilters({ ...filters, subcategory: "all" })
                }
              />
              <span>All</span>
            </label>
            {selectedCategory.subcategories.map((sub) => (
              <label key={sub.id} className="filter-option">
                <input
                  type="radio"
                  name="subcategory"
                  checked={filters.subcategory === sub.id}
                  onChange={() =>
                    setFilters({ ...filters, subcategory: sub.id })
                  }
                />
                <span>{sub.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-range">
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: Number(e.target.value) || 0 })
              }
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) || 2000 })
              }
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        <div className="filter-options">
          {[0, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="filter-option">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => setFilters({ ...filters, rating })}
              />
              <span>
                {rating === 0 ? "All Ratings" : `${rating}+ Stars`}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
