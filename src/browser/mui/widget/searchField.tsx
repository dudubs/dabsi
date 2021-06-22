import CloseIcon from "@material-ui/icons/Close";

import useLangService from "@dabsi/view/lang/useLangService";
import mergeProps from "@dabsi/view/react/mergeProps";
import { Grid, InputAdornment, makeStyles, Tooltip } from "@material-ui/core";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React from "react";
import Debounce from "@dabsi/common/async/Debounce";

const useStyles = makeStyles({
  hidden: {
    visibility: "hidden",
  },
  pointer: {
    cursor: "pointer",
  },
});
export type MuiSearchFieldProps = TextFieldProps & {
  onSearch?(text: string);
  searchDebounceMs?: number;
};

export function MuiSearchField({
  searchDebounceMs = 500,
  onSearch,
  ...TextFieldProps
}: MuiSearchFieldProps) {
  const [text, setText] = React.useState(TextFieldProps.defaultValue || "");
  const langService = useLangService();
  const classes = useStyles();
  const debounce = React.useMemo(() => new Debounce(searchDebounceMs), [
    searchDebounceMs,
  ]);

  return (
    <TextField
      variant="standard"
      placeholder={langService.translateToken("TYPE_TO_SEARCH") + "..."}
      {...mergeProps(TextFieldProps, {
        onChange: async event => {
          const text = event.target.value || "";
          setText(text);
          if (!(await debounce.wait())) return;
          onSearch?.(text);
        },
        onBlur: () => {
          debounce.resolve?.();
        },
        onKeyDown: event => {
          switch (event.key) {
            case "Escape":
              event.preventDefault();
              debounce.cancel();
              setText("");
              onSearch?.("");
            case "Enter":
              debounce.resolve?.();
              break;
            default:
              return;
          }
          event.preventDefault();
        },
      })}
      InputProps={{
        startAdornment: (
          <InputAdornment position={"start"} className={classes.pointer}>
            <Tooltip title={lang`SEARCH`}>
              <SearchIcon />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="start"
            className={clsx(classes.pointer, !text && classes.hidden)}
            onClick={() => {
              debounce.cancel();
              onSearch?.("");
              setText("");
            }}
          >
            <CloseIcon />
          </InputAdornment>
        ),
      }}
      value={text}
    />
  );
}
