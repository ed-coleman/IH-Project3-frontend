import React, { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <h1>Checkout</h1>
      <h3>Order summary</h3>
      <ul style={{listStyleType: "none"}}>
        {cart.map(() => {
          return (
            <div key = {cart} style={{margin: "auto", width: "50%", border: "3px solid black", padding: "10px"}}>
            <li>
              <p>Item: {cart[0].title}</p>
              <p>Price: {cart[0].price}</p>
              <p>Total: {cart[0].price}</p>
            </li>
            </div>
          );
        })}
      </ul>
    </>
  );
}
