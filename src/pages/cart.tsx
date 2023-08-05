import { Button, Flex, MarketplaceHeader, Text } from "components";
import { useMarketplaceDispatch, useMarketplaceState } from "context/MarketplaceContextProvider";
import { useRouter } from "next/router";
import { BiTrash } from "react-icons/bi";

const CartPage: React.FC = () => {
  const state = useMarketplaceState();
  const dispatch = useMarketplaceDispatch();
  const route = useRouter();

  // =========================== FUNCTIONS ============================
  const handleContinueShopping = () => {
    route.push("/");
  };
  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  return (
    <Flex column width="90%" margin="0 auto">
      <MarketplaceHeader />
      <Text kind="f2" transform="uppercase" margin="20px 0">Your Cart</Text>
      <Flex column width="80%" margin="auto" gap="1em">
        <Flex
          column
          width="inherit"
          boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.2)"
          textAlign="left"
          padding="1em"
          align="left"
          gap="10px"
          border="1px solid black"
          borderRadius="8px"
        >
          {state?.cart?.map((product, idx) => (
            <Flex key={idx} >
              <Text key={product.id}>{product.name}</Text>
              <Button onClick={() => handleRemoveItem(product.id)} variant="ghost">
                <BiTrash />
              </Button>
            </Flex>
          ))}
        </Flex>
        <Button onClick={handleContinueShopping}>Continue Shopping</Button>
      </Flex>
    </Flex>
  );
};

export default CartPage;