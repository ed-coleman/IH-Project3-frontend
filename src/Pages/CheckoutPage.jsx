import React, { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <h1>Checkout</h1>
      <ul>
        {cart.map(() => {
          return (
            <div key = {cart}>
            <li>
              <p>Item: {cart[0].title}</p>
              <p>Price: {cart[0].price}</p>
            </li>
            </div>
          );
        })}
      </ul>
    </>
  );
}
