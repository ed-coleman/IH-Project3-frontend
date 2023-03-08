import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser]= useState("")

  const addToCart = () => {
    cart.push(product)
  };
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;