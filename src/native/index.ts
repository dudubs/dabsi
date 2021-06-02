import React from "react";
import { Text } from "react-native";

export const NativeAppComponentRef: { current?: React.ComponentType } = {};

const DefaultApp = () => React.createElement(Text, null, "NO_REACT_NATIVE_App");

export const getNativeAppCompnent = (): React.ComponentType => {
  return NativeAppComponentRef.current || DefaultApp;
};
