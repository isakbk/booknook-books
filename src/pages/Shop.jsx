import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";
import products from "../data/products";

export default function Shop() {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "all";
  const urlSubcategory =
    searchParams.get("subcategory") || "all";
  const urlSort = searchParams.get("sort") || "default";

  const [search, setSearch] = useState(urlSearch);

  const [filters, setFilters] = useState({
    category: urlCategory,
    subcategory: urlSubcategory,
    minPrice: 0,
    maxPrice: 2000,
    rating: 0,
  });

  const [sort, setSort] = useState(urlSort);

  const [mobileFilters, setMobileFilters] =
    useState(false);

  useEffect(() => {
    setSearch(urlSearch);

    setFilters((current) => ({
      ...current,
      category: urlCategory,
      subcategory: urlSubcategory,
    }));

    setSort(urlSort);
  }, [urlSearch, urlCategory, urlSubcategory, urlSort]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        [
          product.title,
          product.author,
          product.brand,
          product.category,
          product.subcategory,
          ...(product.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (filters.category !== "all") {
      result = result.filter(
        (product) =>
          product.category === filters.category
      );
    }

    if (filters.subcategory !== "all") {
      result = result.filter(
        (product) =>
          product.subcategory === filters.subcategory
      );
    }

    result = result.filter(
      (product) =>
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice
    );

    if (filters.rating > 0) {
      result = result.filter(
        (product) =>
          product.rating >= filters.rating
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [search, filters, sort]);

  return (
    <main className="shop-page">
      <section className="page-heading">
        <div className="container">
          <span className="section-label">
            BOOKNOOK COLLECTION
          </span>

          <h1>Shop Books & Stationery</h1>

          <p>
            Discover books, writing tools and creative
            essentials for every kind of reader.
          </p>
        </div>
      </section>

      <div className="container shop-layout">
        <button
          className="mobile-filter-toggle"
          onClick={() =>
            setMobileFilters(!mobileFilters)
          }
        >
          ☷ Filters
        </button>

        <div
          className={`filters-wrapper ${
            mobileFilters ? "show" : ""
          }`}
        >
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        <section className="shop-results">
          <div className="shop-toolbar">
            <div>
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              products
            </div>

            <div className="shop-toolbar-right">
              <input
                className="inline-search"
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="default">
                  Sort: Featured
                </option>
                <option value="rating">
                  Highest Rated
                </option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="name">
                  Name A-Z
                </option>
              </select>
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </section>
      </div>
    </main>
  );
}