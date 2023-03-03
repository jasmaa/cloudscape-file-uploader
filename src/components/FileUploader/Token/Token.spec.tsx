import React from "react";
import { getByText, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Token from ".";

expect.extend(toHaveNoViolations);

describe("test Token", () => {
  it("renders child", () => {
    const { container } = render(
      <Token>
        <p>hi there</p>
      </Token>
    );

    const closeButton = createWrapper(container).findButton();
    expect(closeButton).not.toBeInTheDocument();

    const tokenChild = getByText(container, "hi there");
    expect(tokenChild).toBeInTheDocument();
  });

  it("closes token when close button clicked", () => {
    const onClose = jest.fn();

    const { container } = render(
      <Token onClose={onClose}>
        <p>hi there</p>
      </Token>
    );

    const closeButton = createWrapper(container).findButton();
    closeButton?.click();

    expect(onClose).toBeCalledTimes(1);
  });

  it("has no a11y violations", async () => {
    const onClose = jest.fn();

    const { container } = render(
      <Token onClose={onClose}>
        <p>hi there</p>
      </Token>
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
