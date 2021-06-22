import withStyles from "@dabsi/browser/mui/withStyles";
import Debounce from "@dabsi/common/async/Debounce";
import { Override } from "@dabsi/common/typings2/Override";
import useLangService from "@dabsi/view/lang/useLangService";
import mergeProps from "@dabsi/view/react/mergeProps";
import {
  InputAdornment,
  InputAdornmentProps,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React from "react";

export type MuiSearchFieldProps = TextFieldProps & {
  debounceMs?: number;
  onSearch?(event: React.SyntheticEvent, text: string): void;
  onClearSerach?(event: React.SyntheticEvent): void;
};

export default function MuiSearchField({
  onSearch,
  onClearSerach,
  debounceMs = 1000,
  ...TextFieldProps
}: MuiSearchFieldProps) {
  const [text, setText] = React.useState("");

  const ls = useLangService();

  const debounce = React.useMemo(() => new Debounce(debounceMs), [debounceMs]);

  const emit = (event, text) => {
    if (onClearSerach && !text) {
      return onClearSerach(event);
    }
    onSearch?.(event, text);
  };

  const setTextAndEmit = async (event, text: string) => {
    setText(text);
    if (!(await debounce.wait())) return;
    emit(event, text);
  };

  const search = event => {
    emit(event, text);
  };

  const clear = event => {
    setText("");
    return emit(event, "");
  };

  return (
    <TextField
      placeholder={ls.translateToken("SEARCH")}
      {...mergeProps(TextFieldProps, {
        InputProps: {
          $merge: {
            startAdornment: (
              <StyledInputAdornment
                position="start"
                onClick={event => search(event)}
              >
                <SearchIcon />
              </StyledInputAdornment>
            ),
            endAdornment: (
              <StyledInputAdornment
                position="end"
                onClick={event => clear(event)}
                hide={!text}
              >
                <CloseIcon />
              </StyledInputAdornment>
            ),
          },
        },
        onKeyDown: event => {
          switch (event.key) {
            case "Enter":
              return search(event);

            case "Escape":
              return clear(event);
          }
        },
        onChange: event => {
          setTextAndEmit(event, event.target.value || "");
        },
      })}
      value={text}
    />
  );
}

const StyledInputAdornment = withStyles({
  root: { cursor: "default" },
  hidden: { visibility: "hidden" },
})(
  (
    {
      hide,
      ...p
    }: Override<
      InputAdornmentProps,
      { children: React.ReactElement; hide?: boolean }
    >,
    classes
  ) => (
    <InputAdornment
      {...p}
      className={clsx(p.className, hide && classes.hidden)}
    >
      <Tooltip title={lang`SEARCH`}>{p.children}</Tooltip>
    </InputAdornment>
  )
);
