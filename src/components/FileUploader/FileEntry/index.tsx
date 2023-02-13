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
}: {
  file: File;
  showImage?: boolean;
  truncateLength?: number;
}) {
  const [imageData, setImageData] = useState<string>();

  const reader = new FileReader();
  reader.onload = (event) => {
    setImageData(event.target.result as string);
  };
  reader.readAsDataURL(file);

  const ext = file.name.split(".").pop();
  const displayFileName =
    file.name.length - ext.length > truncateLength
      ? `${file.name.slice(0, truncateLength)}... .${ext}`
      : file.name;

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
      <SpaceBetween size="s">
        <Box>{displayFileName}</Box>
        <Box variant="small">{file.size} bytes</Box>
        <Box variant="small">
          Last modified: {new Date(file.lastModified).toDateString()}
        </Box>
      </SpaceBetween>
    </SpaceBetween>
  );
}
