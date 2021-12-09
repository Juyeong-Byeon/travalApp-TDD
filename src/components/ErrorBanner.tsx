import React from "react";

export const ErrorBanner = ({
  message = "에러입니다.",
}: {
  message: string;
}) => {
  return <div data-testid="error-banner">{message}</div>;
};
