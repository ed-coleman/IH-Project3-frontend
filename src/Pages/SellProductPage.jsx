import React from "react";
import ProductForm from '../components/ProductForm'

export default function SellProductPage({ profile }) {
  return (<ProductForm title='Sell Something' profile = {profile} />)
}
