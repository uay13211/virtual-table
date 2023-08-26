import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memo<T extends React.ComponentType<any>>(component: T): T {
  return (React.memo as <T>(component: T) => T)(component);
}
