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
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

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
            placeholder={lang.translateNode(Lang`SEARCH`)}
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
                    <Tooltip title={Lang`SEARCH`}>
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
