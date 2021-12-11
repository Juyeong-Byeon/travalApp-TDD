import { createContext, useEffect, useMemo, useState } from "react";
import { OrderType } from "./Type";
interface Orders {
  products: Map<string, number>;
  options: Map<string, number>;
}

interface _OrderContext {
  order?: {
    orders: Orders;
    totalPrice: number;
  };
  updateItemCount?: (
    itemName: string,
    newItemCount: number,
    orderType: OrderType
  ) => void;
}

export const OrderContext = createContext<_OrderContext>({});

export function OrderContextProvider(props: any) {
  const [orders, setOrders] = useState<Orders>({
    products: new Map(),
    options: new Map(),
  });

  const [totalPrice, setTotalPrice] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsPrice: number = calculateSubtotal("products", orders);
    const optionPrice: number = calculateSubtotal("options", orders);

    setTotalPrice({
      products: productsPrice,
      options: optionPrice,
      total: productsPrice + optionPrice,
    });
  }, [orders]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: number,
      orderType: OrderType
    ) {
      const newOrderCounts = { ...orders };

      const orderCountsMap = orders[orderType];
      orderCountsMap.set(itemName, newItemCount);
      setOrders(newOrderCounts);
    }

    return [{ ...orders, totalPrice }, updateItemCount];
  }, [orders]);

  return <OrderContext.Provider value={value} {...props} />;
}

function calculateSubtotal(orderType: OrderType, orderCounts: Orders): number {
  const order = orderCounts[orderType];
  const sum = [...order.values()].reduce((acc, current) => acc + current, 0);
  return sum;
}
