import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("order step", () => {
  test("from order start to order completion", async () => {
    render(<App />);

    const product = await screen.findByRole("spinbutton", {
      name: "America",
    });

    const option = await screen.findByRole("checkbox", {
      name: "Dinner",
    });

    userEvent.type(product, "1");

    userEvent.click(option);

    const totalPrice = screen.getByText("Total price", {
      exact: false,
    });

    expect(totalPrice).toHaveTextContent("1500");

    const orderButton = screen.getByRole("button", {
      name: "주문",
    });

    userEvent.click(orderButton);

    const summaryPageTitle = screen.getByRole("heading", {
      name: "주문 확인",
    });
    expect(summaryPageTitle).not.toBeUndefined();

    const productPrice = screen.getByText("products:", {
      exact: false,
    });

    const optionPrice = screen.getByText("options:", {
      exact: false,
    });

    expect(productPrice).toHaveTextContent("1000");
    expect(optionPrice).toHaveTextContent("500");
  });
});

export {};
