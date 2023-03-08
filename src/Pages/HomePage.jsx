import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5005/products");
      const parsed = await response.json();
      setProducts(parsed); 
    } catch (error) {
    console.log(error)
  };
}

  useEffect(() => {
    fetchProducts();
  }, []);

 return (
  <>
    <h1>Browse all of our products:</h1>
    <ul style={{listStyleType: "none"}}>
      {products.map(product => (
        <li key={product._id}>
          <Link to={`/products/${product._id}`}><p style={{color: "black"}}>{product.title}</p></Link> 
        </li>
      ))}
    </ul>
  </>
 )

  
 
}