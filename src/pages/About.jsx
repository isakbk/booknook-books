import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="about-page">
      <section className="page-heading">
        <div className="container">
          <span className="section-label">
            OUR STORY
          </span>

          <h1>About BookNook</h1>

          <p>
            A modern online destination created for
            people who believe every great journey can
            begin with a book.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-visual">
            <div>
              <span>📚</span>
              <strong>Read.</strong>
              <strong>Learn.</strong>
              <strong>Create.</strong>
            </div>
          </div>

          <div className="about-content">
            <span className="section-label">
              WELCOME TO BOOKNOOK
            </span>

            <h2>More than a bookstore.</h2>

            <p>
              BookNook is designed as a cozy digital
              bookstore where readers can discover
              books, explore authors and find quality
              stationery for everyday creativity.
            </p>

            <p>
              From timeless classics and bestselling
              self-help books to notebooks, pens and
              planners, our collection is designed to
              support reading, learning and creating.
            </p>

            <Link
              to="/shop"
              className="btn btn-accent"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container values-grid">
          <div>
            <span>📖</span>
            <h3>Curated Books</h3>
            <p>
              Thoughtfully selected titles for curious
              minds.
            </p>
          </div>

          <div>
            <span>✒️</span>
            <h3>Quality Stationery</h3>
            <p>
              Tools designed to make writing enjoyable.
            </p>
          </div>

          <div>
            <span>♥</span>
            <h3>Reader First</h3>
            <p>
              A shopping experience built around
              readers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}