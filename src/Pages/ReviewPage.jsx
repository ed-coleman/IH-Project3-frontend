import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5005/reviews");
      const parsed = await response.json();
      setReviews(parsed); 
    } catch (error) {
    console.log(error)
  };
}

  useEffect(() => {
    fetchReviews();
  }, []);

 return (
  <>
    <h1>All Reviews</h1>
    <ul>
      {reviews.map(review => (
        <li key={review._id}>
          <Link to={`/reviews/${review.rating}`}>{review.title}</Link>
        </li>
      ))}
    </ul>
  </>
 )

  
 
}