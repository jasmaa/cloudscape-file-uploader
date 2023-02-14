import React from "react";
import { queryByRole, queryByText, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileEntry from ".";

describe("test Token", () => {
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
});
