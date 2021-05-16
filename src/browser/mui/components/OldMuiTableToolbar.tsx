// import { MuiTheme } from "@dabsi/browser/mui/MuiSystem";
// import { MuiSearchField } from "@dabsi/browser/mui/widget/searchField";
// import useLangService from "@dabsi/view/lang/useLangService";
// import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
// import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
// import Grid from "@material-ui/core/Grid";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
// import TextField, { TextFieldProps } from "@material-ui/core/TextField";
// import Toolbar, { ToolbarProps } from "@material-ui/core/Toolbar";
// import Tooltip from "@material-ui/core/Tooltip";
// import Typography, { TypographyProps } from "@material-ui/core/Typography";
// import CloseIcon from "@material-ui/icons/Close";
// import SearchIcon from "@material-ui/icons/Search";
// import clsx from "clsx";
// import React from "react";
// import { ReactNode, useEffect, useState } from "react";

// const useStyles = makeStyles(theme => ({
//   toolbar: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   title: {
//     flex: "1 1 100%",
//   },
//   hidden: {
//     visibility: "hidden",
//   },
// }));

// export function MuiStaticActionsTheme(theme: MuiTheme): MuiTheme {
//   return {
//     ...theme,
//     props: {
//       MuiButton: {
//         variant: "contained",
//         color: "primary",
//       },
//     },
//   };
// }

// export type MuiTableToolbarThemeProps = {
//   titleTypographyProps?: TypographyProps;
//   ToolbarProps?: ToolbarProps;
// };

// export type MuiTableToolbarProps = MuiTableToolbarThemeProps & {
//   search?: {
//     text: string;
//     onSearch?(text: string);
//   };

//   searchTextFieldProps?: TextFieldProps;

//   title?: ReactNode;

//   staticActions?: ReactNode;

//   selectActions?: ReactNode;

//   countSelectedItems?: number;
// };

// const COUNT_SELECTED_ITEMS = lang`SELECTED_${"count"}_ITEMS`;

// export function MuiTableToolbar(props: MuiTableToolbarProps) {
//   const { search: searchProps, titleTypographyProps } = props;

//   const title = props.countSelectedItems ? (
//     <>{COUNT_SELECTED_ITEMS({ count: props.countSelectedItems })}</>
//   ) : (
//     props.title
//   );

//   const titleElement = title && (
//     <Grid item xs>
//       <Typography variant="h5" {...titleTypographyProps}>
//         {title}
//       </Typography>
//     </Grid>
//   );

//   const actionsElement = props.staticActions && (
//     <Grid item xs>
//       <MuiThemeProvider theme={MuiStaticActionsTheme}>
//         {props.staticActions}
//       </MuiThemeProvider>
//     </Grid>
//   );

//   const searchElement = searchProps && (
//     <Grid item>
//       <MuiSearchField
//         onSearch={text => {
//           searchProps!.onSearch?.(text);
//         }}
//       />
//     </Grid>
//   );

//   const sidebarElement: React.ReactNode = props.countSelectedItems
//     ? props.selectActions
//     : (actionsElement || searchElement) && (
//         <Grid container alignItems="center">
//           {actionsElement}
//           {searchElement}
//         </Grid>
//       );

//   if (!titleElement && !sidebarElement) return EmptyFragment;

//   return (
//     <>
//       {titleElement ? (
//         <Grid container>
//           {titleElement}
//           <Grid item>{sidebarElement}</Grid>
//         </Grid>
//       ) : (
//         sidebarElement
//       )}
//     </>
//   );
// }
