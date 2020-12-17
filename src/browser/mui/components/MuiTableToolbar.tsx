import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Toolbar, { ToolbarProps } from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import { Lang } from "@dabsi/lang/Lang";
import { useLangTranslator } from "@dabsi/lang/LangTranslator";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";
import { MuiTheme } from "@dabsi/browser/mui/MuiSystem";

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  hidden: {
    visibility: "hidden",
  },
}));

export function MuiStaticActionsTheme(theme: MuiTheme): MuiTheme {
  return {
    ...theme,
    props: {
      MuiButton: {
        variant: "contained",
        color: "primary",
      },
    },
  };
}

export type MuiTableToolbarThemeProps = {
  titleTypographyProps?: TypographyProps;
  ToolbarProps?: ToolbarProps;
};

export type MuiTableToolbarProps = MuiTableToolbarThemeProps & {
  search?: {
    text: string;
    onSearch?(text: string);
    TextFieldProps?: Partial<TextFieldProps>;
  };

  title?: ReactNode;

  staticActions?: ReactNode;

  selectActions?: ReactNode;

  countSelectedItems?: number;
};

const COUNT_SELECTED_ITEMS = Lang`SELECTED_${"count"}_ITEMS`;

export function MuiTableToolbar(props: MuiTableToolbarProps) {
  const classes = useStyles();
  const { search: searchProps, titleTypographyProps } = props;

  const lang = useLangTranslator();
  const [searchText, setSearchText] = useState(props.search?.text || "");

  useEffect(() => {
    setSearchText(props.search?.text || "");
  }, [props.search?.text]);

  const title = props.countSelectedItems ? (
    <>{COUNT_SELECTED_ITEMS({ count: props.countSelectedItems })}</>
  ) : (
    props.title
  );

  return (
    <Toolbar
      {...mergeProps(props.ToolbarProps, {
        className: classes.toolbar,
      })}
    >
      <Grid container>
        <Grid item xs>
          {title && (
            <Typography variant="h5" {...titleTypographyProps}>
              {title}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {props.countSelectedItems ? (
            props.selectActions
          ) : (
            <Grid container alignItems="center">
              {props.staticActions && (
                <Grid item>
                  <MuiThemeProvider theme={MuiStaticActionsTheme}>
                    {props.staticActions}
                  </MuiThemeProvider>
                </Grid>
              )}
              {searchProps && (
                <Grid item>
                  <TextField
                    value={searchText}
                    placeholder={lang.translateNode(Lang`SEARCH`)}
                    {...mergeProps(searchProps.TextFieldProps, {
                      onChange: event => {
                        const text = event.target.value;
                        setSearchText(text || "");
                        searchProps?.onSearch?.(text);
                      },

                      onBlur: () => {
                        searchProps?.onSearch?.(searchText);
                      },
                      onKeyDown: event => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          setSearchText("");
                          searchProps?.onSearch?.("");
                        }
                      },
                      onKeyPress: event => {
                        // console.log({eventKey:event.key});

                        switch (event.key) {
                          case "Enter":
                            searchProps?.onSearch?.(searchText);
                            break;

                          case "Escape":
                            setSearchText("");
                            break;
                        }
                      },
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position={"end"}>
                            <Tooltip title={Lang`SEARCH`}>
                              {MuiIcon("search")}
                            </Tooltip>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment
                            className={clsx({
                              [classes.hidden]: !searchText,
                            })}
                            position={"start"}
                            onClick={() => {
                              setSearchText("");
                            }}
                          >
                            {MuiIcon("close")}
                          </InputAdornment>
                        ),
                      },
                    })}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
}
