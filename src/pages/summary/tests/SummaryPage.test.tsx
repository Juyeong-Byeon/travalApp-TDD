import { render, screen, fireEvent } from "../../../test-utils";

import { SummaryPage } from "../SummaryPage";

describe("test button disable", () => {
  it("should be able to click only if checkbox is checked", () => {
    render(<SummaryPage setStep={() => {}} />);

    const checkbox = screen.getByRole("checkbox", {
      name: "주문하려는 것을 확인 하셨나요?",
    }) as HTMLFormElement;

    const button = screen.getByRole("button", {
      name: "주문 확인",
    }) as HTMLButtonElement;

    expect(checkbox.checked).toBe(false);
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
    expect(button).not.toBeDisabled();
  });
});
