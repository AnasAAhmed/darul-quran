const RatingStars = ({ rating  }) => {
  const normalizedRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  return (
    <div className="flex flex-row items-start gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= normalizedRating;
        const isHalf = !isFull && star - 0.5 <= normalizedRating && star > normalizedRating;

        if (isFull) {
          return (
            <span key={star} className="text-xl text-yellow-500">
              ★
            </span>
          );
        }
        if (isHalf) {
          return (
            <span
              key={star}
              className="text-xl relative inline-block"
              style={{ display: "inline-block" }}
            >
              <span className="text-gray-300">★</span>
              <span
                className="absolute top-0 left-0 overflow-hidden text-yellow-500"
                style={{ width: "50%" }}
              >
                ★
              </span>
            </span>
          );
        }
        return (
          <span key={star} className="text-xl text-gray-300">
            ★
          </span>
        );
      })}
    </div>
  );
};
export default RatingStars;