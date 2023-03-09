import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../Contexts/SessionContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function ReviewPage({
  reviewProduct = 'productId',
  reviewRating = '',
  reviewReview = "",
  isUpdating = 'false'
}) {
  const navigate = useNavigate();
  const { productId } = useParams()
  const { user, token } = useContext(SessionContext);
  const [product, setproduct] = useState(reviewProduct);
  const [rating, setRating] = useState(reviewRating);
  const [review, setReview] = useState(reviewReview);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(isUpdating);
      const response = await fetch(
        `http://localhost:5005/products${
          isUpdating ? `/update/${productId}` : ""
        }`,
        {
          method: isUpdating ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            product,
            rating,
            review,
          }),
        }
      );
      if (response.status === 201) {
        const parsed = await response.json();
        console.log(parsed);
        navigate(`/products/${productId}`);
      }
      if (response.status === 200) {
        const parsed = await response.json();
        navigate(`/products/${parsed._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>{isUpdating ? "Update Your Review" : "Review This"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <input
            type="text"
            value={productId}
            onChange={(event) => setProduct(event.target.value)}
          />
        </label>
        <label>
          Rating{" "}
          <input
            type="enum"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </label>
        <label>
          Review{" "}
          <input
            type="string"
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />
        </label>
        <button type="submit">{isUpdating ? "Update" : "Review"}</button>
      </form>
    </>
  );
}
