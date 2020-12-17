import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";
import { useRef, useState } from "react";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Lang, LangNode } from "@dabsi/lang/Lang";
import { useLangTranslator } from "@dabsi/lang/LangTranslator";
import { AnyDataInput } from "@dabsi/typerpc/input/data-input/DataInput";
import { DataInputView } from "@dabsi/typerpc/input/data-input/DataInputView";

import { InputType } from "@dabsi/typerpc/input/Input";
import { InputViewProps } from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
import { MuiLink } from "@dabsi/browser/mui/components/MuiLink";
import { MuiDataTableView } from "@dabsi/browser/mui/rpc/MuiDataTableView";

export type AnyDataInputConnection = RpcConnection<AnyDataInput>;

export const useStyles = makeStyles(theme => ({}));

export type MuiDataInputViewProps<
  C extends AnyDataInputConnection
> = InputViewProps<C> & {
  title?: LangNode;
};

// TODO: Load the firsts rows
export function MuiDataInputView<C extends AnyDataInputConnection>(
  props: MuiDataInputViewProps<C>
) {
  type Types = InputType<C>["Types"];
  type TableTypes = Types["TableTypes"];

  const lang = useLangTranslator();
  const inputRef = useRef<DataInputView<C>>(null);
  const [isOpen, setOpen] = useState(false);
  const [queryResult, setQueryResult] = useState<TableTypes["QueryResult"]>();

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
          const options: TableTypes["RowWithKey"][] =
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
                    label={lang.translateNode(props.title)}
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
              {Lang`PICK_${"subject"}`({
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
                      title: Lang`PICK`,
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
                      title: Lang`ACCOUNT_FULL_NAME`,
                      renderRowColumn: (data, props) => (
                        <MuiLink
                          onClick={() => {
                            setQueryResult(undefined);
                            inputRef.current!.setValue(props.row);
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
