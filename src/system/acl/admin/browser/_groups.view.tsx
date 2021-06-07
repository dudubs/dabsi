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
        const form = useParams(id => ACL_AdminRpc.instance.editGroupForm(id));
        return (
          <MuiSection title={lang`EDIT_GROUP`}>
            <MuiFormView
              connection={form}
              onSubmit={() => history.push(root.groups)}
            />
          </MuiSection>
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
