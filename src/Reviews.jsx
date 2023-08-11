import React, { useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = {
      ratings: parseInt(rating),
      comments: comment,
    };

    // Make an API call to send the review data to the backend
    fetch("https://dev-hostels-app.onrender.com/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData), // Send the data without the "review" wrapper
    })
      .then((response) => response.json())
      .then((data) => {
        // You can do something with the response from the backend if needed
        console.log("Review submitted:", data);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });

    // Clear the form after submission
    setRating(0);
    setComment("");
    // Handle success (e.g., show a success message)
  };
  return (
    <div className="reviews-div">
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            min={0}
            max={5}
            value={rating}
            onChange={handleRatingChange}
          />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={handleCommentChange} />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
