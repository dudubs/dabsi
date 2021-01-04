import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import throws from "@dabsi/common/patterns/throws";
import { useStore } from "@dabsi/react/useStore";
import { SystemView } from "@dabsi/modules/rpc/view/SystemView";
import { DataTableView } from "@dabsi/typerpc/widget/data-table/DataTableView";
import { useWidgetNamespaceConnection } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamespaceView";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import React, { useRef } from "react";
import AclGroupActions from "../common/AclGroupActions";
import AclGroupUsersTable from "../common/AclGroupUsersTable";

SystemView.register(AclGroupUsersTable, props => {
  const {
    store,
    state: { changes },
  } = useStore(() => ({
    changes: new Map<string, boolean>(),
  }));

  const actions =
    useWidgetNamespaceConnection(AclGroupActions) ||
    throws("No actions connection");

  const tableRef = useRef<DataTableView<typeof props.connection>>(null);

  async function saveChanges() {
    await actions.updateUsers({
      changes: Object.fromEntries(changes.entries()),
    });

    await tableRef.current!.reload();
    store.at("changes").clear();
  }

  function isRowChecked({ isChecked, $key }) {
    return changes.get($key) ?? !!isChecked;
  }

  function checkRow(row: { isChecked; $key }, value: boolean) {
    const toDelete = (row.isChecked && value) || (!row.isChecked && !value);

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
        >{lang`SAVE_CHANGES`}</Button>
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
              {lang`HAVE_${"count"}_CHANGES`({
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
                        isRowChecked(row) ? allRowsChecked : !allRowsChecked
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
});
