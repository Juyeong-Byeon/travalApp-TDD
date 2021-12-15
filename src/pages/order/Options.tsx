import React, { ChangeEvent } from "react";
import { Order, OrderContext } from "./OrderContext";
import { OrderType } from "./Type";

interface Props {
  name: string;
  description: string;
  order: Order;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    orderType: OrderType
  ) => void;
}

export const Options = ({
  name,
  description,
  order: {
    details: { options },
  },
  updateItemCount,
}: Props) => {
  const onClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, e.currentTarget.checked ? 1 : 0, "options");
  };
  return (
    <form>
      <label htmlFor={`${name} action`}>{name}</label>
      <input
        type="checkbox"
        onChange={onClickHandler}
        name={`${name} action`}
        id={`${name} action`}
      />
    </form>
  );
};
