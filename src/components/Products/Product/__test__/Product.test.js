import { fireEvent, render, screen } from "@testing-library/react";
import Product from "../Product";

const product = {
  id: 1,
  name: "shoe",
  image: {
    url: "test.jpg",
  },
  price: {
    formatted_with_symbol: "RM50",
  },
};

const mockHandleAddToCart = jest.fn((x) => x + 1);

describe("<Product/>", () => {
  it("should render a div", () => {
    render(<Product product={product} />);
    const divElement = screen.getByTestId(/card/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render a product title", async () => {
    render(<Product product={product} />);
    const headerElement = screen.getByText(product.name);
    expect(headerElement).toBeInTheDocument();
  });

  it("should render a product price", async () => {
    render(<Product product={product} />);
    const headerElement = screen.getByText(product.price.formatted_with_symbol);
    expect(headerElement).toBeInTheDocument();
  });

  it("should have add button", async () => {
    render(<Product product={product} />);
    const btnElement = screen.getByRole("button");
    expect(btnElement).toBeInTheDocument();
  });
});
