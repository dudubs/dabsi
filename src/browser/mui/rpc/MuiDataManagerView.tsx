import Typography from "@material-ui/core/Typography";
import React from "react";

import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { OmitKeys } from "../../../common/typings2/OmitKeys";
import { Override } from "../../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "../../../common/typings2/UndefinedIfEmptyObject";
import { mergeProps } from "../../../react/utils/mergeProps";
import {
  AnyDataManager,
  DataManager,
  TDataManager,
} from "../../../typerpc/data-manager/DataManager";
import {
  AnyDataManagerRouter,
  DataManagerRouter,
} from "../../../typerpc/data-manager/DataManagerRouter";
import { RpcConnection, RpcType } from "../../../typerpc/Rpc";
import { FormViewProps } from "../../../typerpc/widget/form/FormView";
import { WidgetExtraView } from "../../../typerpc/widget/WidgetExtraView";
import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { MuiAddButton, MuiButtonProps } from "../components/MuiButton";
import { MuiDataTableView, MuiDataTableViewProps } from "./MuiDataTableView";
import { MuiFormView, MuiFormViewProps } from "./MuiFormView";
import {
  MuiTabsWidgetView,
  MuiTabsWidgetViewProps,
  MuiTabViewProps,
} from "./MuiTabsWidgetView";

type _Types<C extends RpcConnection<AnyDataManager>> = {
  EditTabs: ReturnType<C["edit"]>;
  EditForm: _Types<C>["EditTabs"]["map"]["form"];
  EditInput: _Types<C>["EditForm"]["input"];
  T: RpcType<C>["TConfigHook"]["TDataManager"];
  AddInputIsEditInput: Is<C["add"], _Types<C>["EditInput"]>;
};
export type MuiDataManagerViewProps<
  C extends RpcConnection<AnyDataManager>
> = PartialUndefinedKeys<
  {
    editTabs: UndefinedIfEmptyObject<
      MuiTabsWidgetViewProps<_Types<C>["EditTabs"]>["tabs"]
    >;

    renderEditInput:
      | FormViewProps<_Types<C>["EditForm"]>["input"]
      | If<_Types<C>["AddInputIsEditInput"], undefined>;
  },
  {
    router: DataManagerRouter<_Types<C>["T"]>;
    renderAddInput: FormViewProps<C["add"]>["input"];

    MuiEditFormTabViewProps?: OmitKeys<
      MuiTabViewProps<RpcConnection<_Types<C>["EditForm"]>>,
      "render"
    >;

    MuiDataTableViewProps?: Partial<
      MuiDataTableViewProps<RpcConnection<C["table"]>>
    >;

    MuiAddFormViewProps?: Partial<MuiFormViewProps<RpcConnection<C["add"]>>>;

    MuiEditFormViewProps?: Partial<MuiFormViewProps<_Types<C>["EditForm"]>>;

    MuiAddButtonProps?: MuiButtonProps;
  }
>;

export function MuiDataManagerView<C extends RpcConnection<AnyDataManager>>(
  connection: C
): (props: MuiDataManagerViewProps<C>) => void {
  return props => {
    {
      const _router = props.router as AnyDataManagerRouter;
      const dm = props as MuiDataManagerViewProps<
        RpcConnection<
          DataManager<
            Override<
              TDataManager,
              {
                EditError: never;
                AddError: never;
              }
            >
          >
        >
      >;

      // TODO: save table query as state

      // TODO Save table state on location state
      WidgetRouterView(_router, connection.table, (props, { location }) => {
        // useLocationState(location.useState(""))

        // location.createState()
        return (
          <MuiDataTableView
            {...props}
            {...mergeProps(dm.MuiDataTableViewProps, {
              toolbarActions: {
                add: {
                  buttonType: MuiAddButton,
                  ...dm.MuiAddButtonProps,
                  onClick() {
                    location.at("add").push();
                  },
                },
              },
              onEditClick(event) {
                location.at("edit", { id: event.key }).push();
              },
              onDeleteClick(event) {
                return connection.delete(event.key);
              },
            })}
          />
        );
      });

      WidgetRouterView(
        _router.at("add"),
        connection.add,
        (props, { location }) => {
          return (
            <MuiFormView
              {...props}
              {...mergeProps(dm.MuiAddFormViewProps, {
                onSubmit(id) {
                  location.parent.at("edit", { id }).push();
                },
              })}
              input={dm.renderAddInput}
            />
          );
        }
      );

      WidgetRouterView(
        _router.at("edit"),
        params => connection.edit(params.id),
        {
          renderWidget(props, { location }) {
            return (
              <WidgetExtraView
                {...props}
                children={(props, page) => (
                  <>
                    <Typography>{page.title}</Typography>
                    <MuiTabsWidgetView
                      // onTabChange={}
                      {...props}
                      tabs={{
                        ...dm.editTabs,
                        form: {
                          ...dm.MuiEditFormTabViewProps,
                          render: props => {
                            return (
                              <MuiFormView
                                {...props}
                                {...mergeProps(dm.MuiEditFormViewProps, {
                                  onSubmit() {
                                    location.parent.push();
                                  },
                                })}
                                input={dm.renderEditInput || dm.renderAddInput}
                              />
                            );
                          },
                        },
                      }}
                    />
                  </>
                )}
              />
            );
          },
        }
      );
    }
  };
}
