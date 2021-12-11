import React, { ReactElement } from "react";

interface Props {
  name: string;
  imagePath: string;
}

export default function Products({ name, imagePath }: Props): ReactElement {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:5000${imagePath}`}
        alt={`${name} products`}
      />
      <form>
        <label htmlFor="amount">{name}</label>
        <input
          type="number"
          name={`${name}_amount`}
          id={`${name}_amount`}
          min={0}
          defaultValue={0}
        />
      </form>
    </div>
  );
}
