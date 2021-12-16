import React, { useContext, useState } from "react";
import { OrderContext } from "./OrderContext";
import Type from "./Type";

interface Props {
  setPage?: (page: number) => void;
}

export const OrderPage = (props: Props) => {
  const { order } = useContext(OrderContext);

  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "20",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>

        <div>
          <h2>
            Total price:{order.totalPrice.total || 0}
            <br />
          </h2>
          <button onClick={() => props.setPage?.(1)}>주문</button>
        </div>
      </div>
    </div>
  );
};
