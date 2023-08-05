import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useMarketplaceState } from "context/MarketplaceContextProvider";
import {
  CheckoutForm,
  Flex,
  Text,
  CheckoutProductsSection,
  MarketplaceHeader,
  Loader
} from "components";
import { FormData } from "components/CheckoutForm/CheckoutForm";

const CheckoutPage: React.FC = () => {
  // ============================== HOOKS ===================================
  const router = useRouter();
  const state = useMarketplaceState();

  // ============================== STATES ===================================
  const [isLoading, setIsLoading] = useState(false);

  // ============================== FUNCTIONS ===============================

  const placeOrder = async (formData: FormData) => {
    setIsLoading(true);
    const cartTotal = state?.cart?.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    ) ?? 0;
    const requestBody = {
      cart: state?.cart,
      customer_name: formData.customer_name,
      total: cartTotal
    };
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
    <Flex column width="90%" margin="0 auto">
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
