// import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { render, screen } from "../../../test-utils";
import { server } from "../../mocks/server";
import { OrderContextProvider } from "../OrderContext";

import Type from "../Type";

describe("product list", () => {
  it("should render image well", async () => {
    render(<Type orderType="products" />);

    const productsImage: HTMLImageElement[] = (await screen.findAllByRole(
      "img"
    )) as Array<HTMLImageElement>;

    expect(productsImage).toHaveLength(2);
    const altTexts = productsImage.map((elem) => elem.alt);
    expect(altTexts).toEqual(["America products", "England products"]);
  });

  it("should render error message on server fail", async () => {
    server.resetHandlers(
      rest.get("http://localhost:5000/products", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Type orderType="products" />, { wrapper: OrderContextProvider });

    const errorView = await screen.findByTestId("error-banner");

    expect(errorView).toHaveTextContent("에러가 발생했습니다.");
  });

  it("should render options", async () => {
    render(<Type orderType="options" />, { wrapper: OrderContextProvider });

    const options = await screen.findAllByRole("checkbox");

    expect(options).toHaveLength(2);
    options.map((option) => {
      expect(option).not.toBeChecked();
    });
  });
});

export {};
