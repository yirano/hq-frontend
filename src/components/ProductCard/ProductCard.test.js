import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProductCard } from "components"

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock("context/MarketplaceContextProvider", () => ({
  useMarketplaceDispatch: () => jest.fn(),
}))

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 100,
    vendor_id: 1,
  }

  it("renders correctly", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Buy Now" })).toBeInTheDocument()
  })
})
