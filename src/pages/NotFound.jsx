import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container">
        <div className="not-found-number">
          404
        </div>

        <h1>Page not found</h1>

        <p>
          The page you're looking for doesn't exist
          or has moved.
        </p>

        <Link
          to="/"
          className="btn btn-accent"
        >
          Back to BookNook
        </Link>
      </div>
    </main>
  );
}