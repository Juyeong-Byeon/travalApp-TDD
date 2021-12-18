import React, { ReactElement, useContext, useEffect, useState } from "react";

import Products from "./Products";
import axios from "axios";
import { ErrorBanner } from "../../components/ErrorBanner";
import { Options } from "./Options";
import { OrderContext } from "./OrderContext";

export type OrderType = "products" | "options";

interface Props {
  orderType: OrderType;
}

interface ProductDetail {
  name: string;
  imagePath: string;
  description: string;
}

export default function Type({ orderType }: Props): ReactElement {
  const [items, setItems] = useState<ProductDetail[]>([]);

  const [errorStatus, setErrorStatus] = useState(false);
  const { order, updateItemCount } = useContext(OrderContext);

  useEffect(() => {
    const loadItems = async (orderType: OrderType) => {
      try {
        const response = await axios.get<ProductDetail[]>(
          `http://localhost:5000/${orderType}`
        );
        setItems(response.data);
      } catch (error) {
        setErrorStatus(true);
      }
    };
    loadItems(orderType);
  }, [orderType]);

  if (errorStatus) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItemList = items.map((item) => {
    if (ItemComponent == null) return;

    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={updateItemCount}
        order={order}
      />
    );
  });

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>
        {orderType} price: {order.totalPrice[orderType]}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "products" ? "row" : "column",
        }}
      >
        {optionItemList}
      </div>
    </div>
  );
}
