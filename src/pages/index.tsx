import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { ProductCard, Flex, Filter } from "components";
import { Product, useMarketplaceDispatch, useMarketplaceState } from "context/MarketplaceContextProvider";
import dynamic from "next/dynamic";

const MarketplaceHeader = dynamic(
  () => import("components/MarketplaceHeader"),
  { ssr: false }
);

const Home: React.FC = () => {
  const dispatch = useMarketplaceDispatch();
  const state = useMarketplaceState();
  // ============================== FUNCTIONS ===============================

  const getProducts = useCallback(async () => {
    try {
      const { data: productsRes } = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      if (productsRes) {
        dispatch({ type: 'SET_PRODUCTS', payload: productsRes });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // ============================== USE EFFECTS ===================================
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // ============================== RENDER ===============================
  return (
    <Flex column width="90%" margin="auto">
      <MarketplaceHeader />
      <Filter />
      <Flex gap="16px" margin="32px 16px 0" flexWrap="wrap" justify="center">
        {state?.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
