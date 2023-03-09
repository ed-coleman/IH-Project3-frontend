import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SellProductPage from "./Pages/SellProductPage";
import UpdatePage from "./Pages/UpdatePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import CheckoutPage from "./Pages/CheckoutPage";
import { MantineProvider, Text, AppShell, Header } from '@mantine/core';
import logoBlack from "./assets/logo-black.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./components/LoginButton";





function App() {
  const [profile, setProfile] = useState(null)

  return (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs">{}
      <div>
      <a href="/">
        <img src={logoBlack} alt="logo" style={{width: "45px"}}></img>
        <LoginButton />
        <Link to='/profile'>
        <button type="button" style={{float: "right"}}>Profile</button>
        </Link>
      </a>
      </div>
      </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {<MantineProvider withGlobalStyles withNormalizeCSS theme={{ //colorScheme: 'dark', 
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem' },
    }}>
    <div className="App">
    <Text><h1>Welcome!</h1></Text>
      <Link to="/profile"></Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/products/new" element={<SellProductPage profile = {profile} />} />
        <Route path="/products/update/:productId" element={<UpdatePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = '/profile' element ={<PrivateRoute><ProfilePage profile = {profile} setProfile = {setProfile} /></PrivateRoute>} />
        <Route path = '/checkout' element ={<CheckoutPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />     
      </Routes>
    </div>
    </MantineProvider>}
    </AppShell>

    
  );
}

export default App;
