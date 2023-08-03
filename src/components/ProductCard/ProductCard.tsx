import { Button, Flex, Text } from "components";
import { useMarketplaceDispatch, useMarketplaceState } from "context/MarketplaceContextProvider";

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    vendor_id: number;
  }; // TODO: Come back and verify this type
}
const ProductCard = ({ product }: ProductCardProps) => {

  const dispatch = useMarketplaceDispatch();
  const state = useMarketplaceState();

  const handleClick = () => {
    dispatch({ type: "SET_CART", payload: product });
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
      <Button onClick={handleClick}>Add to Cart</Button>
    </Flex>
  );
};

export default ProductCard;