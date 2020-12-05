import { MuiTheme } from "../MuiSystem";

export function MuiFormViewTheme(theme: MuiTheme): MuiTheme {
  return {
    ...theme,
    typography: {
      ...theme.typography,
      fontSize: 10,
    },
    props: {
      ...theme.props,
      MuiTextField: {
        ...theme.props?.MuiTextField,
        variant: "outlined",
        fullWidth: true,
      },
      MuiOutlinedInput: {
        ...theme.props?.MuiOutlinedInput,
        // margin: "dense",
      },
      MuiButton: {
        ...theme.props?.MuiButton,
        variant: "contained",
        color: "primary",
      },
    },
  };
}
