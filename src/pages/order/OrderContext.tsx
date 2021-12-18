import { createContext, useEffect, useMemo, useState } from "react";
import { OrderType } from "./Type";
export interface OrderDetails {
  products: Map<string, number>;
  options: Map<string, number>;
}

export interface Order {
  details: OrderDetails;
  totalPrice: {
    products: number;
    options: number;
    total: number;
  };
}

interface _OrderContext {
  order: Order;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    orderType: OrderType
  ) => void;
  resetOrders: () => void;
}

export const OrderContext = createContext<_OrderContext>({
  order: {
    details: {
      products: new Map(),
      options: new Map(),
    },
    totalPrice: {
      products: 0,
      options: 0,
      total: 0,
    },
  },
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    orderType: OrderType
  ) => {},
  resetOrders: () => {},
});

const defaultDetails = {
  products: new Map(),
  options: new Map(),
};

const defaultPrices = {
  products: 0,
  options: 0,
  total: 0,
};

export function OrderContextProvider(props: any) {
  const [details, setDetail] = useState<OrderDetails>(defaultDetails);
  const [totalPrice, setTotalPrice] = useState(defaultPrices);

  useEffect(() => {
    const productsPrice: number = calculateSubtotal("products", details);
    const optionPrice: number = calculateSubtotal("options", details);
    const totalValue: number = productsPrice + optionPrice;
    setTotalPrice({
      products: productsPrice,
      options: optionPrice,
      total: totalValue,
    });
  }, [details]);

  const value: _OrderContext = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: number,
      orderType: OrderType
    ) {
      const newOrderCounts = { ...details };

      const orderCountsMap = newOrderCounts[orderType];
      orderCountsMap.set(itemName, newItemCount);
      setDetail(newOrderCounts);
    }

    function resetOrders(): void {
      setDetail(defaultDetails);
      setTotalPrice(defaultPrices);
    }

    return { order: { details, totalPrice }, updateItemCount, resetOrders };
  }, [details, totalPrice]);

  return <OrderContext.Provider value={value} {...props} />;
}

function calculateSubtotal(
  orderType: OrderType,
  orderCounts: OrderDetails
): number {
  const order = orderCounts[orderType];
  const sum = [...order.values()].reduce((acc, current) => acc + current, 0);

  return orderType === "products" ? sum * 1000 : sum * 500;
}
