import { useRouter } from "next/router";
import { useMarketplaceDispatch } from "context/MarketplaceContextProvider";
import { pricify } from "utils";
import { Button, Flex, Text } from "components";

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
  // ============================== HOOKS ================================
  const dispatch = useMarketplaceDispatch();
  const router = useRouter();

  // ============================ FUNCTIONS =============================
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
      minWidth="250px"
      borderRadius="8px"
      boxShadow="0 3px 4px #cccccc4a"
    >
      <Text kind="f2">{product.name}</Text>
      <Text kind="f4">{`$${pricify(product.price)}`}</Text>
      <Flex gap="10px">
        <Button onClick={() => handleAddToCart(ActionType.ADD_TO_CART)}>Add to Cart</Button>
        <Button onClick={() => handleAddToCart(ActionType.BUY_NOW)}>Buy Now</Button>
      </Flex>
    </Flex>
  );
};

export default ProductCard;