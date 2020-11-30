import Typography from "@material-ui/core/Typography";
import React from "react";
import { testMetaType } from "../../../common/MetaType";
import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { IsEmptyObject } from "../../../common/typings2/boolean/IsEmptyObject";
import { OmitKeys } from "../../../common/typings2/OmitKeys";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { mergeProps } from "../../../react/utils/mergeProps";
import {
  AnyDataManager,
  DataManagerTypes,
  TDataManager,
} from "../../../typerpc/data-manager/DataManager";
import {
  AnyDataManagerRouter,
  DataManagerRouter,
} from "../../../typerpc/data-manager/DataManagerRouter";
import { RpcConnection, RpcType } from "../../../typerpc/Rpc";
import { AnyForm, Form } from "../../../typerpc/widget/form/Form";
import { FormViewProps } from "../../../typerpc/widget/form/FormView";
import { TabsWidget } from "../../../typerpc/widget/tabs-widget/TabsWidget";
import { WidgetMap } from "../../../typerpc/widget/widget-map/WidgetMap";
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

type _TypesOld<T extends TDataManager> = DataManagerTypes<T> & {};

type _Types<C extends RpcConnection<AnyDataManager>> = {
  EditTabs: ReturnType<C["edit"]>;
  EditForm: _Types<C>["EditTabs"]["map"]["form"];
};

export type MuiDataManagerViewProps<
  C extends RpcConnection<AnyDataManager>,
  T extends TDataManager = RpcType<C>["TConfigHook"]["TDataManager"]
> = PartialUndefinedKeys<
  {
    renderEditInput:
      | FormViewProps<_Types<C>["EditForm"]>["input"]
      | If<Is<T["AddInput"], T["EditInput"]>, undefined>;

    editTabs:
      | MuiTabsWidgetViewProps<_Types<C>["EditTabs"]>["tabs"]
      | If<IsEmptyObject<T["EditTabs"]>, undefined>;
  },
  {
    connection: C;
    router: DataManagerRouter<T>;

    renderAddInput: FormViewProps<
      RpcConnection<_Types<C>["EditForm"]>
    >["input"];

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
  props: MuiDataManagerViewProps<C>
) {
  const _router = props.router as AnyDataManagerRouter;
  const dm = props as MuiDataManagerViewProps<RpcConnection<AnyDataManager>>;

  // TODO: save table query as state

  // TODO Save table state on location state
  WidgetRouterView(_router, dm.connection.table, (props, { location }) => {
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
            return dm.connection.delete(event.key);
          },
        })}
      />
    );
  });

  WidgetRouterView(
    _router.at("add"),
    dm.connection.add,
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
    params => dm.connection.edit(params.id),
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
