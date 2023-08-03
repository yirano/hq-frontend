import { Button, Flex, MarketplaceHeader, Text } from "components";
import { useMarketplaceDispatch, useMarketplaceState } from "context/MarketplaceContextProvider";
import { BiTrash } from "react-icons/bi";

const CartPage: React.FC = () => {
  const state = useMarketplaceState();
  const dispatch = useMarketplaceDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  return (
    <Flex column>
      <MarketplaceHeader />
      <Flex column alignSelf="flex-start">
        {state?.cart?.map((product) => (
          <Flex>
            <Text key={product.id}>{product.name}</Text>
            <Button onClick={() => handleRemoveItem(product.id)} variant="ghost">
              <BiTrash />
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default CartPage;