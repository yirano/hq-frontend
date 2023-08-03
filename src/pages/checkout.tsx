import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  CheckoutForm,
  Flex,
  Text,
  CheckoutProductsSection,
  MarketplaceHeader,
} from "components";
import axios from "axios";
import Loader from "../components/Loader";
import { useMarketplaceState } from "../context/MarketplaceContextProvider";
import { FormData } from "components/CheckoutForm/CheckoutForm";

const CheckoutPage: React.FC = () => {
  // ============================== HOOKS ===================================
  const router = useRouter();
  const state = useMarketplaceState();

  // ============================== STATES ===================================
  const [isLoading, setIsLoading] = useState(false);

  // ============================== FUNCTIONS ===============================

  const calculateTotal = () => {
    let total = 0;
    state?.cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total / 100;
  };

  const placeOrder = async (formData: FormData) => {
    setIsLoading(true);
    console.log("STATE CART", state?.cart);
    const requestBody = {
      vendor_id: '1', // TODO: replace with actual vendor ID
      location_id: '1', // TODO: replace with actual location ID
      cart: state?.cart, // TODO: assuming state.cart is an array of { product_id, quantity }
      customer_name: formData.customer_name,
      total: '100' // TODO: replace with actual total cost
    };
    console.log("REQUEST BODY ", requestBody);
    try {
      const { data: checkout } = await axios.post<{ success: boolean; }>(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        requestBody
      );
      if (checkout.success) {
        setIsLoading(false);
        router.push("/order-confirmation");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  // ============================== RENDER ===============================
  return (
    <Flex column>
      {isLoading && (
        <Loader text="We are processing your order. Please don't navigate away or refresh this page." />
      )}
      <MarketplaceHeader />
      <Flex column width="100%" maxWidth="1080px">
        <Text kind="f1" margin="0 0 32px">
          {`Checkout`}
        </Text>

        <Flex gap="16px" width="100%" align="flex-start">
          <Flex width="100%">
            <CheckoutForm onSubmit={placeOrder} />
          </Flex>
          <CheckoutProductsSection />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckoutPage;
