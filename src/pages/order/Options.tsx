import React from "react";

interface Props {
  name: string;
}

export const Options = ({ name }: Props) => {
  return (
    <form>
      <label htmlFor={`${name} action`}></label>
      <input type="checkbox" name={`${name} action`} id={`${name} action`} />
    </form>
  );
};
