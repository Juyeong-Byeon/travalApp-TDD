import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils";
import { OrderContextProvider } from "../OrderContext";
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

export {};
