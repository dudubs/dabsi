import { MuiGrid } from "@dabsi/browser/mui/components/MuiGrid";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { Lang } from "@dabsi/lang/Lang";
import { useLoader } from "@dabsi/react/useLoader";
import { useStore } from "@dabsi/react/useStore";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { State } from "@dabsi/react/utils/State";
import AclAdminRouter from "@dabsi/system/acl-admin/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl-admin/AclAdminRpc";
import { AclBreadcrumbs } from "@dabsi/system/acl-admin/browser/AclBreadcrumbs";
import { AclGroupBasicInfoForm } from "@dabsi/system/acl-admin/groups/forms/BasicInfoForm";
import { AclGroupBasicInfoInput } from "@dabsi/system/acl-admin/groups/input/BasicInfoInput";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { useSystemView } from "@dabsi/system/view/useSystemView";
import { DataTableView } from "@dabsi/typerpc/widget/data-table/DataTableView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import React, { useMemo, useRef, useState } from "react";

WidgetRouterView(
  AclAdminRouter.at("groups"),
  AclAdminConnection.groupsManager.table,
  (props, { location }) => (
    <MuiDataTableView
      {...props}
      title={Lang`GROUPS`}
      onEditClick={async event => {
        location.parent.at("editGroup", { groupId: event.row.$key }).push();
      }}
      onDeleteClick={async event => {
        await AclAdminConnection.groupsManager.delete(event.row.$key);
      }}
      MuiTableToolbarProps={{
        staticActions: (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                location.parent.at("createNewGroup").push();
              }}
            >{Lang`CREATE_NEW_GROUP`}</Button>
          </>
        ),
      }}
    />
  )
);

WidgetRouterView(
  AclAdminRouter.at("createNewGroup"),
  AclAdminConnection.groupsManager.add,
  (props, { location }) => (
    <MuiSystemPage
      title={Lang`CREATE_NEW_GROUP`}
      Breadcrumbs={AclBreadcrumbs.Groups}
    >
      <MuiFormView
        {...props}
        submitTitle={Lang`CREATE`}
        submitButtonProps={{ endIcon: <CreateIcon /> }}
        disableResetButton
        onSubmit={() => location.parent.at("groups").push()}
      />
    </MuiSystemPage>
  )
);

WidgetRouterView(
  AclAdminRouter.at("editGroup"),
  params => AclAdminConnection.groupsManager.edit(params.groupId).root,
  (props, { location: { params } }) => {
    const [title, setTitle] = useState("");

    useSystemView(AclGroupBasicInfoForm, props => (
      <MuiEditFormView {...props} />
    ));

    useSystemView(AclGroupBasicInfoInput.at(":groupName"), props =>
      mergeProps(props, {
        inputRef: input => {
          setTimeout(() => {
            setTitle(input?.value || "");
          }, 0);
        },
        onChange: input => {
          setTitle(input.value || "");
        },
      })
    );

    const childKeys = Object.keys(props.connection.ns.rpc.children);

    return (
      <MuiSystemPage
        title={title}
        breadcrumbTitle={title}
        Breadcrumbs={AclBreadcrumbs.Groups}
      >
        <MuiAccordionMapView
          for={props}
          children={{
            [childKeys[childKeys.length - 1]]: {
              after: [
                {
                  title: Lang`GROUP_USERS`,
                  details: <GroupUsers groupId={params.groupId} />,
                },
              ],
            },
          }}
        />
      </MuiSystemPage>
    );
  }
);

function GroupUsers({ groupId }) {
  const connection = useMemo(
    () => AclAdminConnection.groupsManager.edit(groupId),
    [groupId]
  );

  const {
    store,
    state: { changes },
  } = useStore(() => ({
    changes: new Map<string, boolean>(),
  }));

  const tableRef = useRef<DataTableView<typeof connection.users>>(null);

  async function saveChanges() {
    await connection.updateUsers({
      changes: Object.fromEntries(changes.entries()),
    });

    await tableRef.current!.reload();
    store.at("changes").clear();
  }

  return (
    <WidgetViewLoader
      connection={connection.users}
      children={props => {
        function isRowChecked({ isChecked, $key }) {
          return changes.get($key) ?? !!isChecked;
        }

        function checkRow(row: { isChecked; $key }, value: boolean) {
          const toDelete =
            (row.isChecked && value) || (!row.isChecked && !value);

          if (toDelete) {
            store.at("changes").delete(row.$key);
          } else {
            store.at("changes").set(row.$key, value);
          }
        }

        return (
          <MuiGrid direction="column" spacing={3}>
            <div>{renderTable()}</div>
            <div>
              <Button
                disabled={!changes.size}
                color="primary"
                variant="contained"
                onClick={saveChanges}
              >{Lang`SAVE_CHANGES`}</Button>
            </div>
          </MuiGrid>
        );
        function renderTable() {
          return (
            <MuiDataTableView
              {...props}
              tableRef={tableRef}
              TableProps={{ size: "small" }}
              MuiTableToolbarProps={{
                searchTextFieldProps: {
                  fullWidth: true,
                },
                staticActions: changes.size > 0 && (
                  <Typography>
                    {Lang`HAVE_${"count"}_CHANGES`({
                      count: changes.size,
                    })}
                  </Typography>
                ),
              }}
              renderRow={({ key, children }, TableRow) => (
                <TableRow key={key} hover selected={changes.has(key)}>
                  {children}
                </TableRow>
              )}
              columns={{
                isChecked: {
                  MuiTableCellProps: { padding: "checkbox" },
                  renderHeadColumn: ({ table }) => {
                    const allRowsChecked = !table.rows.find(
                      row => !isRowChecked(row)
                    );
                    return (
                      <Checkbox
                        checked={allRowsChecked}
                        onChange={() => {
                          table.rows.forEach(row => {
                            if (
                              isRowChecked(row)
                                ? allRowsChecked
                                : !allRowsChecked
                            ) {
                              checkRow(row, !allRowsChecked);
                            }
                          });
                        }}
                      />
                    );
                  },
                  renderRowColumn: ({ row }) => {
                    return (
                      <Checkbox
                        checked={isRowChecked(row)}
                        onChange={() => {
                          checkRow(row, !isRowChecked(row));
                        }}
                      />
                    );
                  },
                },
              }}
            />
          );
        }
      }}
    />
  );
}
