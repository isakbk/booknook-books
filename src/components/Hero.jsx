import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            Find Your
            <span> Next Read</span>
          </h1>

          <p>
            Discover bestselling books, inspiring stories and
            premium stationery designed for readers, learners
            and creators.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-accent">
              Explore Collection
            </Link>

            <Link
              to="/shop?category=books"
              className="btn btn-outline-light"
            >
              Browse Books
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>10K+</strong>
              <span>Books</span>
            </div>

            <div>
              <strong>5K+</strong>
              <span>Readers</span>
            </div>

            <div>
              <strong>4.8</strong>
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
            <span>BOOK</span>
            <strong>YOUR<br />STORY</strong>
          </div>

          <div className="hero-circle">
            <span>✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}