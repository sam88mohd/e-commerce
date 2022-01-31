# e-commerce project

## project dependencies

- @material-ui/core
- @material-ui/icons
- @chec/commerce.js
- @stripe/react-stripe-js
- @stripe/stripe-js
- react-router-dom
- react-hook-form

## user scenario

### navigation bar

- user see navigation panel in top of page
- navigation panel consist of logo, shop name and cart icon
- badge show number of items in cart

### main page

- user see list of item card as content of main page
- card contain item image, item title, item description and cart logo
- user click add cart icon button and the item is added to cart

### Cart page

- user see list of item available in cart with quantity and price
- user see subtotal price all the items
- user see empty cart button and check out button
- user can click button to add, deduct quantity and remove the item in cart
- user can click empty cart button to clear all item in cart
- user can click check out button to proceed to payment page

### Checkout page

- user see checkout title
- user see form to fill for shopping address
- user see form for payment details
- shopping address form contains:
  - first name
  - last name
  - address line 1
  - email
  - city
  - zip/ postal code
  - shipping country - select input
  - shipping subdivision - select input
  - shipping option - select input
- user see button to back to cart
- user see next button to go to payment details page

### Payment Summary

- user see order summary title
- user see list of item purchased with price and quantity
- user see total price
- user see payment method title
- user see input for key in card detail
- user see back button
- user see pay button with amount to pay
