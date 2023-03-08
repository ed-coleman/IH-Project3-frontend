import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Contexts/CartContext";
import { useContext } from "react";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { setCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/products/${productId}/withReviews`
      );
      const parsed = await response.json();
      if (parsed === null) {
        navigate("/404");
      } else {
        console.log(parsed);
        setProduct(parsed.selectedProduct);
        setReviews(parsed.allReviews);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/products/delete/${productId}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  const handlePurchase = () => {
    setCart((prevValue) => {
      return [...prevValue, { ...product }];
    });
    navigate("/checkout");
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>{product.title}</h1>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <Link to={`/products/update/${product._id}`}>
        <button type="button">Update</button>
      </Link>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" onClick={handlePurchase}>
        Buy product
      </button>
      
      {reviews.map((review) => {
        return (
          <div key={review._id}>
            <h3>{review.review}</h3>
            <h3>{review.rating}</h3>
            <p>Added by: {review.addedBy}</p>
          </div>
        );
      })}
    </>
  );
};

export default ProductPage;
