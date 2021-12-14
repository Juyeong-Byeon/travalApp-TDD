import React, { ChangeEvent, ReactElement } from "react";
import { Order } from "./OrderContext";
import { OrderType } from "./Type";

interface Props {
  name: string;
  imagePath: string;
  order: Order;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    orderType: OrderType
  ) => void;
}

export default function Products({
  name,
  imagePath,
  updateItemCount,
  order,
}: Props): ReactElement {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentVal: number = Number.parseInt(e.currentTarget.value);
    updateItemCount(name, currentVal, "products");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:5000${imagePath}`}
        alt={`${name} products`}
      />
      <form>
        <label htmlFor={`${name}_amount`}>{name}</label>
        <input
          type="number"
          name={`${name}_amount`}
          id={`${name}_amount`}
          min={0}
          onChange={handleChange}
          value={order?.details?.products?.get(name)}
        />
      </form>
    </div>
  );
}
