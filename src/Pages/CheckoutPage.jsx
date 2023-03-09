import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Contexts/CartContext";
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';


const initialConfig = {
  sessionData: "",
  expiresAt: "",
  id: "",
  merchantAccount: "",
  reference: "",
  returnUrl: "",
  amount: {}
}
export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const [currency, setCurrency] = useState('EUR');
  const [value, setValue] = useState(cart[0].price*100);
  const [countryCode, setCountryCode] = useState('FR');
  const [configuration, setConfiguration] = useState(initialConfig);
  const clientKey = 'test_MQB2CKRYYFGMZJZXNJ4RWRXHIAJCL4AW';
  const [hasConfig, setHasConfig] = useState(false);

  const submit = async () => { 
    
    fetch('http://localhost:5005/get-config', {
      'method': 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: currency,
        value: value,
        countryCode: countryCode
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res, 'res')
        setConfiguration(res);
        setHasConfig(true);
        initCheckout(res)
      })

  };

  const initCheckout = async (conf) => {
      const config = {
        environment: 'test', // Change to 'live' for the live environment.
        clientKey: clientKey, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        analytics: {
          enabled: true // Set to false to not send analytics data to Adyen.
        },
        session: {
          id: conf.id, // Unique identifier for the payment session.
          sessionData: conf.sessionData // The payment session data.
        },
        onPaymentCompleted: (result, component) => {
            console.info(result, component);
        },
        onError: (error, component) => {
            console.error(error.name, error.message, error.stack, component);
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            billingAddressRequired: false
          }
        }        
    };
    const checkout = await AdyenCheckout(config);
    const dropinComponent = checkout.create('dropin').mount('#dropin-container');
  };

  useEffect(() => {
    if(!hasConfig) {
      submit()
    }
  },[cart])

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
      <div id="dropin-container"></div>
    </>
  );
}
