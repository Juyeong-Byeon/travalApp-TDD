import React, { ReactElement, useEffect, useState } from "react";

import Products from "./Products";
import axios from "axios";
import { ErrorBanner } from "../../components/ErrorBanner";
import { Options } from "./Options";

type OrderType = "products" | "options";

interface Props {
  orderType: OrderType;
}

interface ProductDetail {
  name: string;
  imagePath: string;
}

export default function Type({ orderType: type }: Props): ReactElement {
  const [items, setItems] = useState<ProductDetail[]>([]);

  const [errorStatus, setErrorStatus] = useState(false);

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
    loadItems(type);
  }, [type]);

  if (errorStatus) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const ItemComponent = type === "products" ? Products : Options;

  const optionItemList = items.map((item) => {
    if (ItemComponent == null) return;

    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격</p>
      {optionItemList}
    </div>
  );
}
