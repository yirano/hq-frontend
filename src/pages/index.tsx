import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ProductCard, Flex } from "components";
import { Product, useMarketplaceState } from "context/MarketplaceContextProvider";
import dynamic from "next/dynamic";

const MarketplaceHeader = dynamic(
  () => import("components/MarketplaceHeader"),
  { ssr: false }
);

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // ============================== FUNCTIONS ===============================

  // TODO: vendor_id + location_id should be dynamic
  const getProducts = useCallback(async () => {
    const vendorId = 1;
    try {
      const { data: productsRes } = await axios.get<Product[]>(
        // `${process.env.NEXT_PUBLIC_API_URL}/products`
        `${process.env.NEXT_PUBLIC_API_URL}/locations/1/vendors/${vendorId}`
      );
      if (productsRes) {
        setProducts(productsRes);
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
    <Flex column>
      <MarketplaceHeader />
      <Flex gap="16px" margin="32px 16px 0">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
