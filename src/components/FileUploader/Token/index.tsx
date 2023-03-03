import React, { ReactNode } from "react";
import { Button, SpaceBetween } from "@cloudscape-design/components";
import styled from "styled-components";
import * as awsui from "@cloudscape-design/design-tokens";

const TokenPanel = styled.div`
  background-color: ${awsui.colorBackgroundItemSelected};
  display: flex;
  border: 0.2em solid ${awsui.colorBorderItemSelected};
  padding: 1em;
  margin: 1em;
  border-radius: ${awsui.borderRadiusToken};
`;

export default function Token({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <TokenPanel>
      <div style={{ width: "100%" }}> {children} </div>
      {!!onClose && (
        <SpaceBetween size="s">
          <Button
            iconName="close"
            variant="inline-icon"
            onClick={onClose}
            ariaLabel="close-token"
          />
        </SpaceBetween>
      )}
    </TokenPanel>
  );
}
