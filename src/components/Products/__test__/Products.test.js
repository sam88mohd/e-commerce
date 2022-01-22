import { render, screen } from "@testing-library/react";
import Products from "../Products";

const products = [
  {
    name: "shoe",
    image: {
      url: "test.jpg",
    },
    price: {
      formatted_with_symbol: "RM50",
    },
  },
  {
    name: "shoe",
    image: {
      url: "test.jpg",
    },
    price: {
      formatted_with_symbol: "RM50",
    },
  },
];

describe("<Products />", () => {
  it("should render a div", () => {
    render(<Products />);
    const divElement = screen.getByTestId(/grid-container/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render a product div", () => {
    render(<Products products={products} />);
    const divElement = screen.getByTestId(/item-0/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render same amount product div as product length", () => {
    render(<Products products={products} />);
    const divElements = screen.getAllByTestId(/item/i);
    expect(divElements.length).toEqual(2);
  });

  it("should not render grid div if product length = 0", () => {
    render(<Products products={[]} />);
    const divElement = screen.queryByTestId(/item/i);
    expect(divElement).not.toBeInTheDocument();
  });
});
