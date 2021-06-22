import { MuiForm } from "@dabsi/browser/mui/components/MuiForm";
import MuiSection from "@dabsi/browser/mui/MuiSection";
import { MuiDataTableView } from "@dabsi/browser/mui/views/MuiDataTableView";
import MuiFormView from "@dabsi/browser/mui/views/MuiFormView";
import AclAdminRpc from "@dabsi/system/acl/admin/common/AclRpc";
import { AclAdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import React from "react";

const x = {
  for: AclAdminRouter,
  let: $ => {
    $({
      at: "groups",
      index: 1,
    });
  },
};

// SystemView
export default RouterView(AclAdminRouter, $ =>
  $.at("groups", $ =>
    $.index(p => (
      <MuiDataTableView
        title={lang`AclGROUPS`}
        connection={AclAdminRpc.instance.groupsTable}
        staticActions={{ add: { tooltip: lang`ADD_NEW_GROUP` } }}
        onAddRow={() => p.navigator.push(p.root.addNewGroup)}
        onEditRow={(_, row) => p.navigator.push(p.root.editGroup(row.$key))}
        onDeleteRow={(_, row) => AclAdminRpc.instance.deleteGroup(row.$key)}
      />
    ))
  )
    .at("editGroup", $ =>
      $.index(p => {
        const connection = p.useParams(id =>
          AclAdminRpc.instance.editGroup(id)
        );
        return (
          <>
            <MuiSection title={lang`EDIT_GROUP`}>
              <MuiFormView
                connection={connection.form}
                onSubmit={() => p.navigator.push(p.root.groups)}
              />
            </MuiSection>
            <MuiDataTableView
              title={lang`USERS_IN_GROUP`}
              connection={connection.usersTable}
              onSelect={async view => {
                await connection.updateUsers(view.getSelectedMap());

                // await view.loadElement();
              }}
              tableWrapper={(table, view) => (
                <MuiForm
                  onSubmit={() => {}}
                  SubmitButtonProps={{
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
      $.index(p => (
        <MuiSection title={lang`ADD_NEW_GROUP`}>
          <MuiFormView
            connection={AclAdminRpc.instance.addNewGroupForm}
            onSubmit={() => p.navigator.push(p.root.groups)}
          />
        </MuiSection>
      ))
    )
);
