import { Tooltip } from "antd";
import { cloneElement, useContext } from "react";
import CapabilitiesContext from "../context/CapabilitiesContext";

type BoundaryProps = {
  children: JSX.Element;
  capability: string;
  disableBy: "hiding" | "disabling";
  component?: JSX.Element;
};

const CapableBoundary = ({
  children,
  capability,
  disableBy,
  component,
}: BoundaryProps) => {
  const capabilities = useContext(CapabilitiesContext);
  if (capability && capabilities.includes(capability)) {
    return children;
  } else if (component) {
    return component;
  } else if (disableBy === "hiding") {
    return null;
  } else {
    return (
      <Tooltip title={`You don't have sufficient permissions`}>
        {cloneElement(children, { disabled: true })}
      </Tooltip>
    );
  }
};

export default CapableBoundary;
