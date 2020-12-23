import { MuiTheme } from "@dabsi/browser/mui/MuiSystem";
import useLangService from "@dabsi/lang/useLangService";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Toolbar, { ToolbarProps } from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React from "react";
import { ReactNode, useEffect, useState } from "react";

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
  };

  searchTextFieldProps?: TextFieldProps;

  title?: ReactNode;

  staticActions?: ReactNode;

  selectActions?: ReactNode;

  countSelectedItems?: number;
};

const COUNT_SELECTED_ITEMS = lang`SELECTED_${"count"}_ITEMS`;

export function MuiTableToolbar(props: MuiTableToolbarProps) {
  const classes = useStyles();
  const { search: searchProps, titleTypographyProps } = props;
  const langService = useLangService();
  const [searchText, setSearchText] = useState(props.search?.text || "");

  useEffect(() => {
    setSearchText(props.search?.text || "");
  }, [props.search?.text]);

  const title = props.countSelectedItems ? (
    <>{COUNT_SELECTED_ITEMS({ count: props.countSelectedItems })}</>
  ) : (
    props.title
  );

  const titleElement = renderTitle();

  const panelElement = (
    <>
      {props.countSelectedItems ? (
        props.selectActions
      ) : (
        <Grid container alignItems="center">
          {renderActions()}
          {renderSearch()}
        </Grid>
      )}
    </>
  );

  return (
    <Toolbar
      {...mergeProps(props.ToolbarProps, {
        className: classes.toolbar,
      })}
    >
      {titleElement ? (
        <Grid container>
          {titleElement}
          <Grid item>{panelElement}</Grid>
        </Grid>
      ) : (
        panelElement
      )}
    </Toolbar>
  );

  function renderTitle() {
    return (
      title && (
        <Grid item xs>
          <Typography variant="h5" {...titleTypographyProps}>
            {title}
          </Typography>
        </Grid>
      )
    );
  }
  function renderActions() {
    return (
      props.staticActions && (
        <Grid item xs>
          <MuiThemeProvider theme={MuiStaticActionsTheme}>
            {props.staticActions}
          </MuiThemeProvider>
        </Grid>
      )
    );
  }

  function renderSearch() {
    return (
      searchProps && (
        <Grid item>
          <TextField
            value={searchText}
            placeholder={langService.translateToken("SEARCH")}
            {...mergeProps(props.searchTextFieldProps, {
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
                    <Tooltip title={lang`SEARCH`}>
                      <SearchIcon />
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
                    <CloseIcon />
                  </InputAdornment>
                ),
              },
            })}
          />
        </Grid>
      )
    );
  }
}
