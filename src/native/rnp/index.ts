import React from "react";

export {
  Button as RnpButton,
  TextInput as RnpTextInput,
  ThemeProvider,
} from "react-native-paper";
import * as Rnp from "react-native-paper";

export type RnpButtonProps = React.ComponentProps<typeof Rnp.Button>;

export type RnpTextInputProps = React.ComponentProps<typeof Rnp.TextInput>;

export type RnpTheme = ReactNativePaper.Theme;
