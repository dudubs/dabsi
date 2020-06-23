import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import {lighten} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Toolbar, {ToolbarProps} from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography, {TypographyProps} from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import React, {createElement, Fragment, ReactNode} from "react";
import {MuiIcon} from "../../../../../browser/src/old/orders/MuiIcon";
import {Lang} from "../../../../localization/Lang";
import {useLangTranslator} from "../../../../localization/LangTranslator";
import {ModalStackContext} from "../../../../react/ModalStack";
import {useDefinedContext} from "../../../../react/utils/hooks/useDefinedContext";
import {MuiButton} from "../../components/MuiButton";
import {AnyMuiDataTable} from "./index";
import {renderTableAction} from "./renderTableAction";


export type MuiDataTableToolbarProps = {
    ToolbarProps?: ToolbarProps;
    ToolbarTitleProps?: TypographyProps;
    renderToolbarMenu?(children: ReactNode): ReactNode;
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: theme.palette.type === 'light' ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    } : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
    },
    title: {
        flex: '1 1 100%',
    },
    hidden: {
        visibility: 'hidden'
    }
}));

const COUNT_SELECTED_ITEMS = Lang`SELECTED_${"count"}_ITEMS`;

export function MuiDataTableToolbar({table}: { table: AnyMuiDataTable }) {

    const {ToolbarProps, ToolbarTitleProps} = table.props;
    const countSelectedItems = table.selectedKeys.size;
    const title =
        (countSelectedItems && table.isMultiSelection) ?
            COUNT_SELECTED_ITEMS({count: countSelectedItems}) :
            table.props.title;

    const lang = useLangTranslator();
    const styles = useStyles();
    const ms = useDefinedContext(ModalStackContext);

    const hasSearchBox = Boolean(table.props.searchIn?.length);
    const hasToolbar = Boolean(title || hasSearchBox || table.props.staticActions?.length);

    if (!hasToolbar)
        return createElement(Fragment);

    const searchBox = hasSearchBox && <TextField
        value={table.text}
        onChange={event => table.text = event.target.value}
        onKeyDown={event => {
            if (event.key === "Escape") {
                table.text = "";
            }
        }}
        placeholder={lang.translateNode(Lang`SEARCH`)}
        InputProps={{
            endAdornment: <InputAdornment position={"end"}>
                <Tooltip title={Lang`SEARCH`}>
                    {MuiIcon("search")}
                </Tooltip>
            </InputAdornment>,
            startAdornment: <InputAdornment className={clsx({
                [styles.hidden]: !table.text
            })} position={"start"} onClick={() => {
                table.text = "";
            }}>
                {MuiIcon("close")}
            </InputAdornment>
        }}
    />;

    return <Toolbar {...ToolbarProps} className={clsx(
        ToolbarProps?.className,
        styles.root,
        {[styles.highlight]: countSelectedItems > 0}
    )}>
        <Grid container>
            <Grid item xs>
                {title && <Typography variant={"h6"} {...ToolbarTitleProps} className={clsx(
                    ToolbarTitleProps?.className,
                    styles.title
                )}>{title}</Typography>}
            </Grid>
            <Grid item>
                {(!countSelectedItems) && table.props.staticActions?.map((action, index) =>
                    <MuiButton
                        iconOnly
                        size={"small"}
                        icon={action.icon} key={index}
                        title={action.title}
                        onClick={() => {
                            action.handle?.(table);
                        }}/>
                )}
                {(countSelectedItems > 0) ?
                    table.multipleActions.map((action, index) =>
                        renderTableAction(table, ms, action, index,
                            () => table.selectedKeys.toArray())
                    ) : table.props.renderToolbarMenu ?
                        table.props.renderToolbarMenu(searchBox) : searchBox
                }
            </Grid>
        </Grid>
    </Toolbar>
}
