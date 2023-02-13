import React, { ReactNode } from "react";
import { Button, SpaceBetween } from "@cloudscape-design/components";

export default function Token({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        border: "0.2em solid #0972d3",
        backgroundColor: "#f2f8fd",
        padding: "1em",
        margin: "1em",
        borderRadius: "1em",
      }}
    >
      <div style={{ width: "100%" }}> {children} </div>
      <SpaceBetween size="s">
        <Button iconName="close" variant="inline-icon" onClick={onClose} />
      </SpaceBetween>
    </div>
  );
}
