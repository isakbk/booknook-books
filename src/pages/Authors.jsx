import { Link } from "react-router-dom";
import products from "../data/products";

export default function Authors() {
  const authors = {};

  products
    .filter((product) => product.author)
    .forEach((product) => {
      if (!authors[product.authorSlug]) {
        authors[product.authorSlug] = {
          name: product.author,
          slug: product.authorSlug,
          books: 0,
          image: product.image,
        };
      }

      authors[product.authorSlug].books++;
    });

  const authorList = Object.values(authors);

  return (
    <main className="authors-page">
      <section className="page-heading">
        <div className="container">
          <span className="section-label">
            MEET THE WRITERS
          </span>

          <h1>Authors</h1>

          <p>
            Explore books from some of our most loved
            authors.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="author-grid">
            {authorList.map((author) => (
              <Link
                to={`/author/${author.slug}`}
                className="author-card"
                key={author.slug}
              >
                <img
                  src={author.image}
                  alt={author.name}
                />

                <div>
                  <h3>{author.name}</h3>
                  <span>
                    {author.books}{" "}
                    {author.books === 1
                      ? "book"
                      : "books"}
                  </span>
                </div>

                <span className="category-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}