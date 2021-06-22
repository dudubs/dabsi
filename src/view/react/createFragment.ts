import React from "react";

export default function createFragment(...children: React.ReactNode[]) {
  return React.createElement(React.Fragment, null, ...arguments);
}
