import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/router"
import { ProductCard } from "components"

const mockPush = jest.fn()
const mockDispatch = jest.fn()

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

jest.mock("context/MarketplaceContextProvider", () => ({
  useMarketplaceDispatch: () => mockDispatch,
  useMarketplaceState: () => jest.fn(),
}))

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 100,
    vendor_id: 1,
  }

  it("renders product name, price, and buttons correctly", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("$1.00")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Buy Now" })).toBeInTheDocument()
  })

  it("dispatches SET_CART action with correct payload when 'Add to Cart' button is clicked", async () => {
    render(<ProductCard product={mockProduct} />)
    userEvent.click(screen.getByRole("button", { name: "Add to Cart" }))

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CART",
        payload: mockProduct,
      })
    })
  })

  it("routes to /checkout when 'Buy Now' button is clicked", async () => {
    render(<ProductCard product={mockProduct} />)
    const { push } = useRouter()
    userEvent.click(screen.getByRole("button", { name: "Buy Now" }))
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/checkout")
    })
  })
})
