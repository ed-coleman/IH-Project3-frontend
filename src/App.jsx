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
import logoBlack from "../public/logo-black.svg";

function App() {
  return (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs">{}
      <a href="/">
        <img src={logoBlack} alt="logo" style={{width: "45px"}}></img>
      </a>
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
      <Link to="/profile"><p style={{color: "black"}}>Click here to sign up/log in</p></Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/products/new" element={<SellProductPage />} />
        <Route path="/products/update/:productId" element={<UpdatePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = '/profile' element ={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path = '/checkout' element ={<CheckoutPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />     
      </Routes>
    </div>
    </MantineProvider>}
    </AppShell>

    
  );
}

export default App;
