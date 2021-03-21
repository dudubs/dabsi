import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { MuiForm } from "@dabsi/browser/mui/form";
import { ACL_Admin_Connection } from "@dabsi/system/acl/plugins/admin/common/rpc";
import { ACL_Admin_Router } from "@dabsi/system/acl/plugins/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter/view";
import { DataTableView } from "@dabsi/typerpc/data-table/view";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/view/loader";
import React from "react";

RouterView.define(ACL_Admin_Router, {
  children: {
    groups: ({ location }) => {
      console.log({ location });

      return (
        <WidgetViewLoader connection={ACL_Admin_Connection.groups.table}>
          {props => {
            return (
              <MuiDataTableView
                {...props}
                onEditClick={event => {
                  location.parent
                    .at("editGroup", { id: event.row.$key })
                    .push();
                }}
              />
            );
          }}
        </WidgetViewLoader>
      );
    },
    createNewGroup: props => (
      <WidgetViewLoader connection={ACL_Admin_Connection.groups.add}>
        {props => <SystemView {...props} />}
      </WidgetViewLoader>
    ),
    editGroup: ({ useParams }) => {
      const connection = useParams(({ id }) =>
        ACL_Admin_Connection.groups.item(id)
      );

      const usersTableRef = React.useRef<DataTableView<any>>(null);

      const [checkedUsers, setCheckedUsers] = React.useState(
        null as null | Record<string, boolean>
      );

      return (
        <>
          <WidgetViewLoader connection={connection.basicInfo}>
            {props => <SystemView {...props} />}
          </WidgetViewLoader>

          <MuiForm
            onSubmitClick={async () => {
              if (!checkedUsers) return;
              await connection.updateUsers(checkedUsers);
              usersTableRef.current!.resetAndReload();
            }}
            submitTitle={
              <>
                {lang`SAVE_CHANGES`}
                {checkedUsers ? ` (${Object.keys(checkedUsers).length})` : null}
              </>
            }
            submitButtonProps={{ disabled: !checkedUsers }}
          >
            <WidgetViewLoader connection={connection.users}>
              {props => (
                <MuiDataTableView
                  {...props}
                  TableProps={{ size: "small" }}
                  title={lang`GROUP_USERS`}
                  tableRef={usersTableRef}
                  onCheckChanged={checkedUsers => {
                    setCheckedUsers(checkedUsers);
                  }}
                />
              )}
            </WidgetViewLoader>
          </MuiForm>
        </>
      );
    },
  },
});
