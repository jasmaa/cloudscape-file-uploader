import React from "react";
import { queryByRole, queryByText, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import FileEntry from ".";

expect.extend(toHaveNoViolations);

describe("test FileEntry", () => {
  const file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });

  it("renders image when showImage is true", () => {
    const { container } = render(<FileEntry file={file} showImage />);

    const image = queryByRole(container, "img");
    expect(image).toBeInTheDocument();
  });

  it("does not render image when showImage is false", () => {
    const { container } = render(<FileEntry file={file} />);

    const image = queryByRole(container, "img");
    expect(image).not.toBeInTheDocument();
  });

  it("does not truncate file name when file name length less than truncation length", () => {
    const fileName = "a".repeat(5);
    const file = new File([fileName], `${fileName}.txt`, {
      type: "text/plain",
    });
    const { container } = render(<FileEntry file={file} truncateLength={20} />);

    const expectedFileName = `${"a".repeat(5)}.txt`;

    const text = queryByText(container, expectedFileName);
    expect(text).toBeInTheDocument();
  });

  it("truncates file name when file name length greater than truncation length", () => {
    const fileName = "a".repeat(50);
    const file = new File([fileName], `${fileName}.txt`, {
      type: "text/plain",
    });
    const { container } = render(<FileEntry file={file} truncateLength={20} />);

    const expectedFileName = `${"a".repeat(20)}... .txt`;

    const text = queryByText(container, expectedFileName);
    expect(text).toBeInTheDocument();
  });

  it("does not truncate file name when file name length equals truncation length", () => {
    const fileName = "a".repeat(20);
    const file = new File([fileName], `${fileName}.txt`, {
      type: "text/plain",
    });
    const { container } = render(<FileEntry file={file} truncateLength={20} />);

    const expectedFileName = `${"a".repeat(20)}.txt`;

    const text = queryByText(container, expectedFileName);
    expect(text).toBeInTheDocument();
  });

  it("renders last modified date", () => {
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
      lastModified: new Date("1999-01-02T00:00:00").getTime(),
    });
    const { container } = render(<FileEntry file={file} />);

    const text = queryByText(container, "Last modified: Sat Jan 02 1999");
    expect(text).toBeInTheDocument();
  });

  it("renders translations when i18nStrings are set", () => {
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
      lastModified: new Date("1999-01-02T00:00:00").getTime(),
    });
    const { container } = render(
      <FileEntry
        file={file}
        i18nStrings={{
          numberOfBytes: (n) => `${n} B`,
          lastModified: (d) =>
            `最終変更：${d.toLocaleDateString("ja-JP", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`,
        }}
      />
    );

    const text = queryByText(container, "最終変更：1999年1月2日土曜日");
    expect(text).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<FileEntry file={file} showImage />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
