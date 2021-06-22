import React from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

type Style = ViewStyle | TextStyle | ImageStyle;
export default function makeStyles<T extends Record<string, Style>>(
  callback: (theme: ReactNativePaper.Theme) => T
): () => T {
  return () => {
    const theme = useTheme();
    return React.useMemo(() => callback(theme), [theme]);
  };
}
