import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Toolbar, { ToolbarProps } from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import { Lang } from "../../../lang/Lang";
import { useLangTranslator } from "../../../lang/LangTranslator";
import { mergeProps } from "../../../react/utils/mergeProps";
import { MuiIcon } from "./MuiIcon";

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

export type MuiTableToolbarProps = {
  ToolbarProps?: ToolbarProps;

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
  const { search: searchProps } = props;

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
          {title}
        </Grid>
        <Grid item>
          {props.countSelectedItems ? (
            props.selectActions
          ) : (
            <Grid container alignItems="center">
              {props.staticActions && <Grid item>{props.staticActions}</Grid>}
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
