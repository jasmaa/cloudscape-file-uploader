import React from "react";
import {
  fireEvent,
  getByTestId,
  queryByText,
  render,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import createWrapper from "@cloudscape-design/components/test-utils/dom";
import { axe, toHaveNoViolations } from "jest-axe";
import FileUploader from ".";

expect.extend(toHaveNoViolations);

describe("test FileUploader", () => {
  const file1 = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });
  const file2 = new File(["bar"], "bar.png", {
    type: "image/png",
  });
  const file3 = new File(["ALSUdragonbook"], "ALSUdragonbook.pdf", {
    type: "application/pdf",
    lastModified: new Date("1999-01-02T00:00:00").getTime(),
  });
  const singleFiles = [file1];
  const multipleFiles = [file1, file2, file3];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("uploads single file", async () => {
    const onFilesUploaded = jest.fn();
    const { container } = render(
      <FileUploader
        fileInputId="fileUploadId"
        text="Upload file"
        files={singleFiles}
        onFilesUploaded={onFilesUploaded}
      />
    );

    for (const file of singleFiles) {
      const textEl = queryByText(container, file.name);
      expect(textEl).toBeInTheDocument();
    }

    const fileUploadInput = container.querySelector(
      "#fileUploadId"
    ) as HTMLElement;
    fireEvent.change(fileUploadInput, {
      target: { files: singleFiles },
    });

    await waitFor(() => {
      expect(onFilesUploaded).toBeCalledTimes(1);
    });
  });

  it("uploads multiple files", async () => {
    const onFilesUploaded = jest.fn();
    const onFileRemoved = jest.fn();
    const { container } = render(
      <FileUploader
        fileInputId="fileUploadId"
        text="Upload file"
        files={multipleFiles}
        onFilesUploaded={onFilesUploaded}
        onFileRemoved={onFileRemoved}
        multiple
      />
    );

    for (const file of multipleFiles) {
      const textEl = queryByText(container, file.name);
      expect(textEl).toBeInTheDocument();
    }

    const fileUploadInput = container.querySelector(
      "#fileUploadId"
    ) as HTMLElement;
    fireEvent.change(fileUploadInput, {
      target: { files: multipleFiles },
    });

    await waitFor(() => {
      expect(onFilesUploaded).toBeCalledTimes(1);
    });
  });

  it("removes file when token close button is clicked", async () => {
    const onFilesUploaded = jest.fn();
    const onFileRemoved = jest.fn();
    const { container } = render(
      <FileUploader
        fileInputId="fileUploadId"
        text="Upload file"
        files={multipleFiles}
        onFilesUploaded={onFilesUploaded}
        onFileRemoved={onFileRemoved}
        multiple
      />
    );

    const fooTokenEl = getByTestId(container, "token-foo.txt");
    const closeButton = createWrapper(fooTokenEl).findButton();
    closeButton?.click();

    expect(onFileRemoved).toBeCalledTimes(1);
  });

  it("renders translations when i18nStrings are set", () => {
    const onFilesUploaded = jest.fn();
    const { container } = render(
      <FileUploader
        fileInputId="fileUploadId"
        text="Upload file"
        files={multipleFiles}
        onFilesUploaded={onFilesUploaded}
        multiple
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
    const onFilesUploaded = jest.fn();
    const { container } = render(
      <FileUploader
        fileInputId="fileUploadId"
        text="Upload file"
        files={singleFiles}
        onFilesUploaded={onFilesUploaded}
      />
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
