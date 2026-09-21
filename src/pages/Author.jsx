import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";

export default function Author() {
  const { slug } = useParams();

  const authorBooks = products.filter(
    (product) => product.authorSlug === slug
  );

  if (!authorBooks.length) {
    return (
      <main className="not-found-page">
        <div className="container">
          <h1>Author not found</h1>

          <Link
            to="/authors"
            className="btn btn-accent"
          >
            View Authors
          </Link>
        </div>
      </main>
    );
  }

  const author = authorBooks[0];

  return (
    <main className="author-page">
      <section className="author-hero">
        <div className="container author-hero-inner">
          <div className="author-photo">
            <img
              src={author.image}
              alt={author.author}
            />
          </div>

          <div>
            <span className="section-label">
              AUTHOR
            </span>

            <h1>{author.author}</h1>

            <p>
              Explore the collection of books by{" "}
              {author.author}, available at BookNook.
            </p>

            <span className="author-book-count">
              {authorBooks.length}{" "}
              {authorBooks.length === 1
                ? "book"
                : "books"}{" "}
              available
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">
              COLLECTION
            </span>

            <h2>Books by {author.author}</h2>
          </div>

          <ProductGrid products={authorBooks} />
        </div>
      </section>
    </main>
  );
}