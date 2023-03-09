import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../Contexts/SessionContext";

export default function ProfilePage({ profile, setProfile }) {
  const { user, setUser, token } = useContext(SessionContext); //import the SessioContext above on line 2, then  you can access the user and token by destructuring w/ {}

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:5005/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const parsed = await response.json();
        console.log(response);
        setProfile(parsed);
        setUser(parsed);
        console.log(parsed, "this is the user");
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, [token]);
  return profile ? (
    <>
      <h3>Listed Products</h3>
      <ul>
        {profile.listedProducts ? profile.listedProducts.map((product) => {
          return (
            
            <div>
            <h1>{product.title}</h1>
            <img style={{width: "90%", height: "auto", color: "black"}} src={product.image} alt="this is a pic"/>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        
        </div>
            
          );
        }):(<p>no products</p>)}
      </ul>
    </>
  ) : (
    <>User not found</>
  );
}
