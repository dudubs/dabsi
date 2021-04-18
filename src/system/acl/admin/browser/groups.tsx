import { MuiForm } from "@dabsi/browser/mui/form";
import { MuiFormView } from "@dabsi/browser/mui/form/view";
import { MuiSection, MuiSectionList } from "@dabsi/browser/mui/section";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { ACL_Admin_Browser_Breadcrumbs } from "@dabsi/system/acl/admin/browser/breadcrumbs";
import { ACL_Admin_Connection } from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter/view";
import { DataTableView } from "@dabsi/typerpc/data-table/view";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/view/loader";
import { Typography } from "@material-ui/core";
import React from "react";

RouterView.define(ACL_AdminRouter, {
  children: {
    groups: ({ location }) => {
      return (
        <>
          <ACL_Admin_Browser_Breadcrumbs.Groups />
          <WidgetViewLoader connection={ACL_Admin_Connection.groups.table}>
            {props => (
              <MuiDataTableView
                {...props}
                title={lang`ACL_GROUPS`}
                addButtonTitle={lang`CREATE_NEW_GROUP`}
                onDeleteRow={event =>
                  ACL_Admin_Connection.groups.item(event.row.$key).delete()
                }
                onAddNewRow={() => {
                  location.parent.at("createNewGroup").push();
                }}
                onEditRow={event => {
                  location.parent
                    .at("editGroup", { id: event.row.$key })
                    .push();
                }}
              />
            )}
          </WidgetViewLoader>
        </>
      );
    },
    createNewGroup: ({ location }) => (
      <>
        <ACL_Admin_Browser_Breadcrumbs.Groups>
          <Typography>{lang`ADD_NEW_GROUP`}</Typography>
        </ACL_Admin_Browser_Breadcrumbs.Groups>
        <MuiSection title={lang`ADD_NEW_GROUP`}>
          <WidgetViewLoader connection={ACL_Admin_Connection.groups.add}>
            {props => (
              <MuiFormView
                {...props}
                onSubmit={() => {
                  location.parent.at("groups").push();
                }}
              />
            )}
          </WidgetViewLoader>
        </MuiSection>
      </>
    ),
    editGroup: ({ useParams }) => {
      const connection = useParams(({ id }) =>
        ACL_Admin_Connection.groups.item(id)
      );

      const [groupName, setGroupName] = React.useState("");

      const usersTableRef = React.useRef<DataTableView<any>>(null);

      const [checkedUsers, setCheckedUsers] = React.useState(
        null as null | Record<string, boolean>
      );

      return (
        <>
          <ACL_Admin_Browser_Breadcrumbs.Groups>
            <Typography>
              {lang`EDIT_${"GROUP_NAME"}`({
                GROUP_NAME: `"${groupName}"`,
              })}
            </Typography>
          </ACL_Admin_Browser_Breadcrumbs.Groups>

          <MuiSectionList>
            <MuiSection title={lang`GROUP_BASIC_INFO`}>
              <WidgetViewLoader connection={connection.basicInfo}>
                {props => (
                  <MuiFormView
                    {...props}
                    onInputValue={value => {
                      setGroupName(value.groupName || "");
                    }}
                    variant="save"
                  />
                )}
              </WidgetViewLoader>
            </MuiSection>

            <MuiForm
              onSubmitClick={async () => {
                if (!checkedUsers) return;
                await connection.updateUsers(checkedUsers);
                usersTableRef.current!.resetAndReload();
              }}
              submitTitle={
                <>
                  {lang`SAVE_CHANGES`}
                  {checkedUsers
                    ? ` (${Object.keys(checkedUsers).length})`
                    : null}
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
          </MuiSectionList>
        </>
      );
    },
  },
});
