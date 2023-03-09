import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../Contexts/SessionContext";
import { useContext } from "react";

export default function ProductForm({
  productTitle = "",
  productPrice = 0,
  productCategory = "",
  productDescription = "",
  productBrand = "",
  isUpdating = false,
  productId,
  productImage = ""
}) {
  const navigate = useNavigate();
  const { user, token } = useContext(SessionContext);
  const [title, setTitle] = useState(productTitle);
  const [price, setPrice] = useState(productPrice);
  const [category, setCategory] = useState(productCategory);
  const [description, setDescription] = useState(productDescription);
  const [brand, setBrand] = useState(productBrand);
  const [image, setImage] = useState(productImage);

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
            title,
            description,
            price,
            brand,
            category,
            image
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
      <h1>{isUpdating ? "Update Your Listing" : "Sell Something"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Produce Name{" "}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Product Price{" "}
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label>
          Category{" "}
          <input
            type="enum"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </label>
        <label>
          Description{""}
          <input
            type="string"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Brand{""}
          <input
            type="string"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </label>
        <label>
          Image{""}
          <input
            type="string"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        <button type="submit">{isUpdating ? "Update" : "Sell"}</button>
      </form>
    </>
  );
}
