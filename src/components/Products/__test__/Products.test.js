import { render, screen } from "@testing-library/react";
import Products from "../Products";

describe("<Products />", () => {
  it("should render a div", () => {
    render(<Products />);
    const divElement = screen.getByTestId(/grid-container/i);
    expect(divElement).toBeInTheDocument();
  });
});
