import React from "react";
import {DataManager, TDataManager} from "../../../server/handlers/DataManager";
import {TDataManagerRouter} from "../../../server/handlers/DataManagerRouter";
import {If, Is, NonNullableAt, PartialUndefinedKeys} from "../../common/typings";
import {Lang} from "../../localization/Lang";
import {mergeProps} from "../../react/utils/mergeProps";
import {Router} from "../../typerouter/Router";
import {RpcConnection} from "../../typerpc/Rpc";
import {FormInput} from "../../typerpc/widget/Form";
import {FormViewProps} from "../../typerpc/widget/FormView";
import {TWidgetViewRouter} from "../../typerpc/widget/WidgetViewRouter";
import {MuiDataTableView, MuiDataTableViewProps} from "./form2/MuiDataTableView";
import {MuiFormView, MuiFormViewProps} from "./form2/MuiFormView";

export type MuiDataManagerRouterViewProps<T extends TDataManager, P> =
    PartialUndefinedKeys<{

        renderEditInput: FormViewProps<RpcConnection<T['EditForm']>>['input']
            | If<Is<FormInput<T['EditForm']>, FormInput<T['AddForm']>>, undefined>;


    }, P & {

        connection: RpcConnection<DataManager<T>>

        renderAddInput: FormViewProps<RpcConnection<T['AddForm']>>['input'];


        MuiDataTableViewProps?:
            Partial<MuiDataTableViewProps<RpcConnection<T['Table']>>>;

        AddMuiFormViewProps?:
            Partial<MuiFormViewProps<RpcConnection<T['AddForm']>>>;

        EditMuiFormViewProps?:
            Partial<MuiFormViewProps<RpcConnection<T['EditForm']>>>;
    }>;


export function MuiDataManagerRouter<T extends TDataManagerRouter<TDataManager> & TWidgetViewRouter>(
    props: MuiDataManagerRouterViewProps<NonNullableAt<T, 'TDataManager'>, {
        router: Router<T>,
    }>
) {

    const {
        connection,
        AddMuiFormViewProps,
        EditMuiFormViewProps,
        MuiDataTableViewProps,
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

    router.at("edit").renderWidget(params => connection.Edit(params.id).Form, props => {

        // TODO: TITLE

        return <MuiFormView
            {...props.widget}
            {...mergeProps(EditMuiFormViewProps, {
                onSubmit() {
                    // todo: alert saved
                }
            })}
            input={renderEditInput || renderAddInput}
        />
    })


}


