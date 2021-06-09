import { MuiForm } from "@dabsi/browser/mui/components/MuiForm";
import MuiSection from "@dabsi/browser/mui/MuiSection";
import { MuiDataTableView } from "@dabsi/browser/mui/views/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import React from "react";

export default RouterView(ACL_AdminRouter, $ =>
  $.at("groups", $ =>
    $.index(({ root, history }) => (
      <MuiDataTableView
        title={lang`ACL_GROUPS`}
        connection={ACL_AdminRpc.instance.groupsTable}
        staticActions={{ add: { tooltip: lang`ADD_NEW_GROUP` } }}
        onAddRow={() => history.push(root.addNewGroup)}
        onEditRow={(_, row) => history.push(root.editGroup(row.$key))}
        onDeleteRow={(_, row) => ACL_AdminRpc.instance.deleteGroup(row.$key)}
      />
    ))
  )
    .at("editGroup", $ =>
      $.index(({ useParams, history, root }) => {
        const connection = useParams(id => ACL_AdminRpc.instance.editGroup(id));
        return (
          <>
            <MuiSection title={lang`EDIT_GROUP`}>
              <MuiFormView
                connection={connection.form}
                onSubmit={() => history.push(root.groups)}
              />
            </MuiSection>
            <MuiDataTableView
              title={lang`USERS_IN_GROUP`}
              connection={connection.usersTable}
              onSelect={async view => {
                await connection.updateUsers(view.getSelectedMap());
                // await view.reloadElement();
              }}
              tableWrapper={(table, view) => (
                <MuiForm
                  onSubmit={() => {}}
                  submitButtonProps={{
                    disabled: !view.hasSelectionChanges,
                  }}
                  submitTitle={lang`SAVE_CHANGES`}
                >
                  {table}
                </MuiForm>
              )}
            />
          </>
        );
      })
    )
    .at("addNewGroup", $ =>
      $.index(({ root, history }) => (
        <MuiSection title={lang`ADD_NEW_GROUP`}>
          <MuiFormView
            connection={ACL_AdminRpc.instance.addNewGroupForm}
            onSubmit={() => history.push(root.groups)}
          />
        </MuiSection>
      ))
    )
);
