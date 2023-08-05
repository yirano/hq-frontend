import React from "react";
import { Button, Flex, Text } from "components";
import { useMarketplaceDispatch, useMarketplaceState } from "context/MarketplaceContextProvider";
import { useRouter } from "next/router";

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    vendor_id: number;
    location_id: number;
  };
}

enum ActionType {
  ADD_TO_CART,
  BUY_NOW
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useMarketplaceDispatch();
  const router = useRouter();
  const handleAddToCart = (action: ActionType) => {
    dispatch({ type: "SET_CART", payload: product });
    if (action === ActionType.BUY_NOW) {
      router.push("/checkout");
    }
  };

  // ========================== RENDER ===============================
  return (
    <Flex
      column
      display="flex"
      padding="1em"
      gap="1em"
      border="1px solid #ccc"
    >
      <Text kind="f2">{product.name}</Text>
      <Text kind="f7">{product.price}</Text>
      <Button onClick={() => handleAddToCart(ActionType.ADD_TO_CART)}>Add to Cart</Button>
      <Button onClick={() => handleAddToCart(ActionType.BUY_NOW)}>Buy Now</Button>
    </Flex>
  );
};

export default ProductCard;