import { MuiForm } from "@dabsi/browser/mui/form";
import { MuiFormView } from "@dabsi/browser/mui/form/view";
import { MuiSection, MuiSectionList } from "@dabsi/browser/mui/section";
import { MuiDataTableView } from "@dabsi/browser/mui/widget/DataTable";
import { ACL_Admin_Browser_Breadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/breadcrumbs";
import { ACL_Admin_Connection } from "@dabsi/system/acl/plugins/admin/common/rpc";
import { ACL_Admin_Router } from "@dabsi/system/acl/plugins/admin/view/router";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter/view";
import { DataTableView } from "@dabsi/typerpc/data-table/view";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/view/loader";
import { Breadcrumbs, Divider, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledDivider = styled(Divider)`
  margin-top: ${p => p.theme.spacing(1)}px !important;
  margin-bottom: ${p => p.theme.spacing(2)}px !important;
`;

RouterView.define(ACL_Admin_Router, {
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
    createNewGroup: props => (
      <WidgetViewLoader connection={ACL_Admin_Connection.groups.add}>
        {props => <SystemView {...props} />}
      </WidgetViewLoader>
    ),
    editGroup: ({ useParams, location }) => {
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
            <Typography>{groupName}</Typography>
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
