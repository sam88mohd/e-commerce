import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

describe("<Navbar />", () => {
  it("Navbar should contain a logo", () => {
    render(<Navbar />);
    const navbarLogo = screen.getByRole("img");
    expect(navbarLogo).toBeInTheDocument();
  });

  it("Navbar should contain a title", () => {
    render(<Navbar />);
    const navbarTitle = screen.getByText(/Commerce/i);
    expect(navbarTitle).toBeInTheDocument();
  });
});
