# HQ - UI test

Welcome to your backend test for HQ, clone the repository and start by
following the instructions below.

# The goal

Create the necessary components, functions, and page/s and integrate this frontend with the API.

Once you are done your application should be able to render the marketplace and place a successful order.

## Running the application

- Create an `.env` file with the following variables:

```
NEXT_PUBLIC_API_URL="http://localhost:8000/"
```

- Run your BE application

- Run your FE application by running:

```bash
  yarn dev
```

- Your application should be on `http://localhost:3000`

## Tasks

- Build a `ProductCard` component that can:

  - a. Display individual products
  - b. "Buy Now" button, ability to add the product to cart and immediately navigate the user to the checkout page `/checkout`.
  - c. "Add to Cart" button, ability to add product to cart and make the PopOver component appear.

- Build cart page with the following:
  - a. The cart page should display the products added to cart.
  - b. The cart page should have the ability to remove items in cart.
  - c. "Checkout" button, there should be a checkout button that navigates the user to checkout.
  - d. "Continue Shopping" button, user should be able to navigate back to the marketplace landing page and continue shopping.

## Bonus points

This is not needed for the test but would gain you extra points if you
manage to fit it within the allocated time.

- Create unit tests for the ProductCard component using react-testing-library
