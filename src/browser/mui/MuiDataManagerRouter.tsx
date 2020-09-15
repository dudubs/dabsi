import Typography from "@material-ui/core/Typography";
import React from "react";

import {TDataManagerRouter} from "../../../server/handlers/DataManagerRouter";
import {MetaType} from "../../common/MetaType";
import {If, Is, IsEmptyObject, PartialUndefinedKeys} from "../../common/typings";
import {Lang} from "../../localization/Lang";
import {mergeProps} from "../../react/utils/mergeProps";
import {Router} from "../../typerouter/Router";
import {DataManager, DataManagerTypes, TDataManager} from "../../typerpc/DataManager";
import {RpcConnection} from "../../typerpc/Rpc";
import {ElementWidgetView} from "../../typerpc/widget/ElementWidgetView";
import {FormInput} from "../../typerpc/widget/Form";
import {FormViewProps} from "../../typerpc/widget/FormView";
import {TabsWidget} from "../../typerpc/widget/TabsWidget";
import {TWidgetViewRouter} from "../../typerpc/widget/WidgetViewRouter";
import {MuiDataTableView, MuiDataTableViewProps} from "./form2/MuiDataTableView";
import {MuiFormView, MuiFormViewProps} from "./form2/MuiFormView";
import {MuiTabsWidgetView, MuiTabsWidgetViewProps} from "./widget/MuiTabsWidgetView";

export type MuiDataManagerRouterViewProps<T extends TDataManager, P,
    Types extends DataManagerTypes<T> = DataManagerTypes<T>> =
    PartialUndefinedKeys<{

        renderEditInput: FormViewProps<RpcConnection<Types['EditForm']>>['input']
            | If<Is<FormInput<Types['EditForm']>,
            FormInput<Types['AddForm']>>, undefined>;


        tabs: MuiTabsWidgetViewProps<RpcConnection<TabsWidget<T['Tabs']>>>['tabs']
            | If<IsEmptyObject<T['Tabs']>, undefined>


    }, P & {

        connection: RpcConnection<DataManager<T>>

        renderAddInput: FormViewProps<RpcConnection<Types['AddForm']>>['input'];

        FormTabProps?: MuiTabsWidgetViewProps.Tab;

        MuiDataTableViewProps?:
            Partial<MuiDataTableViewProps<RpcConnection<Types['Table']>>>;

        AddMuiFormViewProps?:
            Partial<MuiFormViewProps<RpcConnection<Types['AddForm']>>>;

        EditMuiFormViewProps?:
            Partial<MuiFormViewProps<RpcConnection<Types['EditForm']>>>;

    }>;


export function MuiDataManagerRouter<T extends TDataManagerRouter<TDataManager> & TWidgetViewRouter>(
    props: MuiDataManagerRouterViewProps<MetaType<T>['TDataManager'], {
        router: Router<T>,
    }>
) {

    const {
        connection,
        AddMuiFormViewProps,
        EditMuiFormViewProps,
        MuiDataTableViewProps,
        tabs,
        FormTabProps,
        renderAddInput,
        renderEditInput,
        router,
    } = props as MuiDataManagerRouterViewProps<TDataManager, {
        router: Router<TDataManagerRouter<TDataManager> & TWidgetViewRouter>,
    }>;


    router.renderWidget(() => connection.Table, props => {


        return <MuiDataTableView
            {...props.widget}
            {...mergeProps(MuiDataTableViewProps, {

                toolbarActions: [{
                    title: Lang`ADD`,
                    icon: "add",
                    onClick() {
                        props.location.at("add").push();
                    }
                }],

                onDeleteClick() {

                },
                onEditClick(event) {
                    props.location.at("edit", {id: event.key}).push();
                },
                onAddClick() {
                    props.location.at("add").push();
                }
            })}

        />;
    });

    router.at("add").renderWidget(() => connection.Add, props => {
        return <MuiFormView
            {...props.widget}
            {...mergeProps(AddMuiFormViewProps, {
                onSubmit(id) {
                    props.location.parent.at("edit", {id}).push();
                },
            })}
            input={renderAddInput}
        />
    });

    router.at("edit").renderWidget(params => connection.Edit(params.id), props => {
        return <ElementWidgetView  {...props.widget} children={([element, props]) =>
            <>
                <Typography>{element.title}</Typography>
                <MuiTabsWidgetView
                    {...props}
                    tabs={{
                        Form: [FormTabProps || {}, props =>
                            <MuiFormView
                                {...props}
                                {...mergeProps(EditMuiFormViewProps, {
                                    onSubmit() {
                                        // todo: alert saved
                                    }
                                })}
                                input={renderEditInput || renderAddInput}
                            />],
                        ...tabs
                    }}/>
            </>
        }/>
    })


}
