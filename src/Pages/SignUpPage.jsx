import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    console.log({ userName, email, passwordHash });
    const response = await fetch("http://localhost:5005/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, passwordHash }),
    });
    const parsed = await response.json();
    console.log(parsed);
    if (response.status === 201) {
    navigate("/login");
    }
  };

  return (
    <>
      <div>Sign Up</div>
      <AuthForm
        userName={userName}
        setUserName={setUserName}
        passwordHash={passwordHash}
        setPasswordHash={setPasswordHash}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
      />
      <Link to='/login'>Already A User? Log In</Link>
    </>
  );
}
