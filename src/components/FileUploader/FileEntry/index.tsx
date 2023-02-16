import React, { useState } from "react";
import {
  Box,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";

export default function FileEntry({
  file,
  showImage = false,
  truncateLength = 20,
  i18nStrings,
}: {
  file: File;
  showImage?: boolean;
  truncateLength?: number;
  i18nStrings?: {
    numberOfBytes: (n: number) => string;
    lastModified: (d: Date) => string;
  };
}) {
  const [imageData, setImageData] = useState<string>();

  const reader = new FileReader();
  reader.onload = (event) => {
    setImageData(event.target.result as string);
  };
  reader.readAsDataURL(file);

  const ext = file.name.split(".").pop();
  const displayFileName =
    file.name.length - ext.length - 1 > truncateLength
      ? `${file.name.slice(0, truncateLength)}... .${ext}`
      : file.name;
  const lastModifiedDate = new Date(file.lastModified);
  const fileSize = file.size;

  return (
    <SpaceBetween size="s" direction="horizontal">
      <StatusIndicator type="success" />
      {showImage && (
        <img
          style={{
            width: "5em",
            height: "5em",
            objectFit: "cover",
          }}
          src={imageData}
        />
      )}
      <SpaceBetween size="xxxs">
        <Box>{displayFileName}</Box>
        <Box variant="small">
          {i18nStrings
            ? i18nStrings.numberOfBytes(fileSize)
            : `${fileSize} bytes`}
        </Box>
        <Box variant="small">
          {i18nStrings
            ? i18nStrings.lastModified(lastModifiedDate)
            : `Last modified: ${lastModifiedDate.toDateString()}`}
        </Box>
      </SpaceBetween>
    </SpaceBetween>
  );
}
