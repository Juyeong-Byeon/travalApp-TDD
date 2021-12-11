import React, { useState } from "react";
import Type from "./Type";

interface Props {}

export const OrderPage = (props: Props) => {
  const [totalPrice, setTotalPrice] = useState(0);
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
            Total price: <span data-testid="price">{totalPrice}</span> <br />
          </h2>
          <button>주문</button>
        </div>
      </div>
    </div>
  );
};
