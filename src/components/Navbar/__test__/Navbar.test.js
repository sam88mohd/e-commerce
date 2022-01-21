import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("<Navbar />", () => {
  it("Navbar should contain a logo", () => {
    render(<MockNavbar />);
    const navbarLogo = screen.getByRole("img");
    expect(navbarLogo).toBeInTheDocument();
  });

  it("Navbar should contain a title", () => {
    render(<MockNavbar />);
    const navbarTitle = screen.getByText(/Commerce/i);
    expect(navbarTitle).toBeInTheDocument();
  });

  it("Navbar should contain a shoppping cart button", () => {
    render(<MockNavbar />);
    const shoppingCartButton = screen.getByRole("button");
    expect(shoppingCartButton).toBeInTheDocument();
  });
});
