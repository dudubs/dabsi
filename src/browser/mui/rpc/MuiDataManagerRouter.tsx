import Typography from "@material-ui/core/Typography";
import React from "react";

import { MetaType } from "../../../common/MetaType";
import {
  If,
  Is,
  IsEmptyObject,
  PartialUndefinedKeys,
} from "../../../common/typings";
import { mergeProps } from "../../../react/utils/mergeProps";
import { Router } from "../../../typerouter/Router";
import {
  DataManager,
  DataManagerTypes,
  TDataManager,
} from "../../../typerpc/data-manager/DataManager";
import { TDataManagerRouter } from "../../../typerpc/data-manager/DataManagerRouter";

import { RpcConnection } from "../../../typerpc/Rpc";
import { FormViewProps } from "../../../typerpc/widget/form/FormView";
import { InlineWidgetView } from "../../../typerpc/widget/inline-widget/InlineWidgetView";
import { TabsWidget } from "../../../typerpc/widget/tabs-widget/TabsWidget";
import { TWidgetViewRouter } from "../../../typerpc/widget/WidgetViewRouter";
import { MuiAddButton, MuiButtonProps } from "../components/MuiButton";
import { MuiDataTableView, MuiDataTableViewProps } from "./MuiDataTableView";
import { MuiFormView, MuiFormViewProps } from "./MuiFormView";
import { MuiTabsWidgetView, MuiTabsWidgetViewProps } from "./MuiTabsWidgetView";

type _Types<T extends TDataManager> = DataManagerTypes<T> & {};

export type MuiDataManagerRouterViewProps<
  T extends TDataManager,
  P
> = PartialUndefinedKeys<
  {
    renderEditInput:
      | FormViewProps<RpcConnection<_Types<T>["EditForm"]>>["input"]
      | If<Is<T["EditInput"], T["EditInput"]>, undefined>;

    tabs:
      | MuiTabsWidgetViewProps<RpcConnection<TabsWidget<T["EditTabs"]>>>["tabs"]
      | If<IsEmptyObject<T["EditTabs"]>, undefined>;
  },
  P & {
    connection: RpcConnection<DataManager<T>>;

    renderAddInput: FormViewProps<RpcConnection<_Types<T>["AddForm"]>>["input"];

    FormTabProps?: MuiTabsWidgetViewProps.Tab;

    MuiDataTableViewProps?: Partial<
      MuiDataTableViewProps<RpcConnection<_Types<T>["Table"]>>
    >;

    AddMuiFormViewProps?: Partial<
      MuiFormViewProps<RpcConnection<_Types<T>["AddForm"]>>
    >;

    EditMuiFormViewProps?: Partial<
      MuiFormViewProps<RpcConnection<_Types<T>["EditForm"]>>
    >;

    MuiAddButtonProps?: MuiButtonProps;
  }
>;

export function MuiDataManagerRouter<
  T extends TDataManagerRouter<TDataManager> & TWidgetViewRouter
>(
  props: MuiDataManagerRouterViewProps<
    MetaType<T>["TDataManager"],
    {
      router: Router<T>;
    }
  >
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
    MuiAddButtonProps,
  } = props as MuiDataManagerRouterViewProps<
    TDataManager,
    {
      router: Router<TDataManagerRouter<TDataManager> & TWidgetViewRouter>;
    }
  >;

  router.renderWidget(
    () => connection.table,
    props => {
      return (
        <MuiDataTableView
          {...props.widget}
          {...mergeProps(MuiDataTableViewProps, {
            toolbarActions: {
              add: {
                buttonType: MuiAddButton,
                ...MuiAddButtonProps,
                onClick() {
                  props.location.at("add").push();
                },
              },
            },

            onDeleteClick(event) {
              return connection.delete(event.key);
            },
            onEditClick(event) {
              props.location.at("edit", { id: event.key }).push();
            },
            onAddClick() {
              props.location.at("add").push();
            },
          })}
        />
      );
    }
  );

  router.at("add").renderWidget(
    () => connection.add,
    props => {
      return (
        <MuiFormView
          {...props.widget}
          {...mergeProps(AddMuiFormViewProps, {
            onSubmit(id) {
              props.location.parent.at("edit", { id }).push();
            },
          })}
          input={renderAddInput}
        />
      );
    }
  );

  router.at("edit").renderWidget(
    params => connection.edit(params.id),
    props => {
      return (
        <InlineWidgetView
          {...props.widget}
          children={({ targetProps, inlineElement: page }) => (
            <>
              <Typography>{page.title}</Typography>
              <MuiTabsWidgetView
                {...targetProps}
                tabs={{
                  form: [
                    FormTabProps || {},
                    props => (
                      <MuiFormView
                        {...props}
                        {...mergeProps(EditMuiFormViewProps, {
                          onSubmit() {
                            // todo: alert saved
                          },
                        })}
                        input={renderEditInput || renderAddInput}
                      />
                    ),
                  ],
                  ...tabs,
                }}
              />
            </>
          )}
        />
      );
    }
  );
}
