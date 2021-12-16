import { findByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils";
import { OrderPage } from "../OrderPage";
import Products from "../Products";
import Type from "../Type";

describe("test order page", () => {
  it("products 상품 항목 개수별로 가격 계산을 잘 해야함.", async () => {
    render(<Type orderType="products" />);

    const price = screen.getByText("products price:", {
      exact: false,
    });
    expect(price).toHaveTextContent("0");

    const americaPriceInput = await screen.findByLabelText("America");

    userEvent.clear(americaPriceInput);
    userEvent.type(americaPriceInput, "3");

    expect(price).toHaveTextContent("3000");
  });

  it("options 상품 항목 체크된 개수별로 가격 계산을 잘 해야함", async () => {
    render(<Type orderType="options" />);

    const optionPrice = screen.getByText("options price:", { exact: false });
    expect(optionPrice).toHaveTextContent("0");

    const insurance = await screen.findByRole("checkbox", {
      name: "Insurance",
    });

    expect(insurance).not.toBeChecked();

    userEvent.click(insurance);

    expect(optionPrice).toHaveTextContent("500");
    expect(insurance).toBeChecked();

    userEvent.click(insurance);
    expect(insurance).not.toBeChecked();
    expect(optionPrice).toHaveTextContent("0");
  });
});

describe("total price of goods and options", () => {
  test("total price starts with 0 and Updating total price when adding one product", async () => {
    render(<OrderPage />);

    const totalPrice = screen.getByText("Total price:", {
      exact: false,
    });

    expect(totalPrice).toHaveTextContent("0");

    const product = await screen.findByRole("spinbutton", {
      name: "England",
    });

    userEvent.clear(product);
    userEvent.type(product, "1");

    expect(totalPrice).toHaveTextContent("0");
  });
  test("Updating total price when adding one option", async () => {
    render(<OrderPage />);
    const totalPrice = screen.getByText("Total price:", {
      exact: false,
    });

    const option = await screen.findByRole("checkbox", {
      name: "Dinner",
    });

    expect(option).not.toBeChecked();

    userEvent.click(option);

    expect(option).toBeChecked();

    expect(totalPrice).toHaveTextContent("500");
  });
  test("Updating total price when removing option and product", async () => {
    render(<OrderPage />);

    const totalPrice = screen.getByText("Total price:", {
      exact: false,
    });

    expect(totalPrice).toHaveTextContent("0");

    const productInput = await screen.findByRole("spinbutton", {
      name: "America",
    });

    const optionCheckBox = await screen.findByRole("checkbox", {
      name: "Dinner",
    });

    userEvent.type(productInput, "3");
    userEvent.click(optionCheckBox);

    expect(totalPrice).toHaveTextContent("3500");

    userEvent.type(productInput, "1");
    expect(totalPrice).toHaveTextContent("1500");

    userEvent.click(optionCheckBox);
    expect(totalPrice).toHaveTextContent("1000");
  });
});

export {};
