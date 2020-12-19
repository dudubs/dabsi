import { MuiLink } from "@dabsi/browser/mui/components/MuiLink";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";
import { AnyDataInput } from "@dabsi/typerpc/input/data-input/DataInput";
import { DataInputView } from "@dabsi/typerpc/input/data-input/DataInputView";
import { InputViewProps } from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyDataTableTypes } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";
import { useRef, useState } from "react";

export type AnyDataInputConnection = RpcConnection<AnyDataInput>;

export const useStyles = makeStyles(theme => ({}));

export type MuiDataInputViewProps<
  C extends AnyDataInputConnection
> = InputViewProps<C> & {
  title?: React.ReactNode;
};

// TODO: Load the firsts rows
export function MuiDataInputView<C extends AnyDataInputConnection>(
  props: MuiDataInputViewProps<C>
) {
  const inputRef = useRef<DataInputView<C>>(null);
  const [isOpen, setOpen] = useState(false);
  const [queryResult, setQueryResult] = useState<
    AnyDataTableTypes["QueryResult"]
  >();

  async function updateOptions(text: string) {
    setQueryResult(
      await props.connection.table.query({
        getCount: true,
        text,
        pageSize: 15,
      })
    );
  }

  return (
    <>
      <DataInputView
        {...props}
        ref={inputRef}
        children={view => {
          const options: AnyDataTableTypes["RowWithKey"][] =
            queryResult?.rows || (view.value ? [view.value] : []);

          return (
            <>
              <Autocomplete
                clearOnEscape
                value={view.value || null}
                onChange={(_, value) => {
                  view.setValue(value);
                }}
                onDoubleClick={() => {
                  setOpen(true);
                }}
                onInputChange={(_, value) => updateOptions(value)}
                getOptionLabel={row => row.label}
                options={options}
                getOptionSelected={(o, v) => o.$key === v.$key}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={!!view.error}
                    helperText={view.renderError()}
                    label={props.title}
                  />
                )}
              />
            </>
          );
        }}
      />

      {isOpen && (
        <Dialog open onClose={() => setOpen(false)}>
          <DialogContent>
            <DialogTitle>
              {lang`PICK_${"subject"}`({
                subject: props.title,
              })}
            </DialogTitle>
            <WidgetViewLoader
              connection={props.connection.table}
              children={props => (
                <MuiDataTableView
                  // disableToolbar
                  {...props}
                  actions={{
                    pick: {
                      title: lang`PICK`,
                      icon: require("@material-ui/icons/KeyboardReturn"),
                      onClick: event => {
                        setQueryResult(undefined);
                        inputRef.current!.setValue(event.row);
                        setOpen(false);
                      },
                    },
                  }}
                  columns={{
                    label: {
                      title: lang`ACCOUNT_FULL_NAME`,
                      renderRowColumn: ({ row, data }) => (
                        <MuiLink
                          onClick={() => {
                            setQueryResult(undefined);
                            inputRef.current!.setValue(row);
                            setOpen(false);
                          }}
                        >
                          {data}
                        </MuiLink>
                      ),
                    },
                  }}
                />
              )}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
