import React from "react";

interface Props {
  name: string;
  description: string;
}

export const Options = ({ name, description }: Props) => {
  return (
    <form>
      <label htmlFor={`${name} action`}>{`${name}: ${description}`}</label>
      <input type="checkbox" name={`${name} action`} id={`${name} action`} />
    </form>
  );
};
