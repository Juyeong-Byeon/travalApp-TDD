import { render, RenderOptions } from "@testing-library/react";
import { OrderContextProvider } from "./pages/order/OrderContext";

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

export { customRender as render };
export * from "@testing-library/react";
