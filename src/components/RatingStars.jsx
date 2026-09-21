export default function RatingStars({ rating, reviews = 0 }) {
  return (
    <div className="rating">
      <span className="stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            {index < Math.round(rating) ? "★" : "☆"}
          </span>
        ))}
      </span>

      <span className="rating-number">{rating}</span>

      {reviews > 0 && (
        <span className="review-count">({reviews})</span>
      )}
    </div>
  );
}