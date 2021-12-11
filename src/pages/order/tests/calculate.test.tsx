import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Type from "../Type";

describe("test order page", () => {
  it("상품 항목 개수별로 가격 계산을 잘 해야함.", async () => {
    render(<Type orderType="products" />);

    const totalPrice = await screen.getByText("상품 총 가격:", {
      exact: false,
    });
    expect(totalPrice).toHaveTextContent("0");

    const americaPriceInput = await screen.findByRole("spinbutton", {
      name: "America_amount",
    });

    userEvent.clear(americaPriceInput);
    userEvent.type(americaPriceInput, "1");

    expect(totalPrice).toHaveTextContent("1000");
  });
});

export {};
