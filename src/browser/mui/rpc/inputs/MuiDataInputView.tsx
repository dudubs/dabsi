import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useRef, useState } from "react";
import { If, Is, PartialUndefinedKeys } from "../../../../common/typings";
import { Lang, LangNode } from "../../../../lang/Lang";
import { useLangTranslator } from "../../../../lang/LangTranslator";
import { AnyDataInput } from "../../../../typerpc/input/data-input/DataInput";
import { DataInputView } from "../../../../typerpc/input/data-input/DataInputView";

import { InputType } from "../../../../typerpc/input/Input";
import { InputViewProps } from "../../../../typerpc/input/InputView";
import { RpcConnection } from "../../../../typerpc/Rpc";
import { WidgetViewLoader } from "../../../../typerpc/widget/WidgetViewLoader";
import { MuiLink } from "../../components/MuiLink";
import { MuiDataTableView } from "../MuiDataTableView";

export type AnyDataInputConnection = RpcConnection<AnyDataInput>;

export const useStyles = makeStyles(theme => ({}));

// TODO: Load the firsts rows
export function MuiDataInputView<C extends AnyDataInputConnection>(
  props: PartialUndefinedKeys<
    {
      getLabel:
        | ((row: InputType<C>["Types"]["TableTypes"]["RowWithKey"]) => string)
        | If<Is<InputType<C>["Types"]["Row"], { label: string }>, undefined>;
    },
    InputViewProps<C> & {
      title?: LangNode;

      // TODO: labelColumnTitle?:
    }
  >
) {
  type Types = InputType<C>["Types"];
  type TableTypes = Types["TableTypes"];
  type TableRow = TableTypes["RowWithKey"];

  const lang = useLangTranslator();
  const inputRef = useRef<DataInputView<C>>(null);
  const [isOpen, setOpen] = useState(false);
  const [queryResult, setQueryResult] = useState<TableTypes["QueryResult"]>();

  async function updateOptions(text: string) {
    setQueryResult(
      await props.connection.controller.getRows({
        getCount: true,
        text,
        take: 15,
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
                onInputChange={(_, value) => {
                  updateOptions(value);
                }}
                getOptionLabel={row =>
                  props["getLabel"] ? props["getLabel"](row) : row["label"]
                }
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
              connection={props.connection.controller}
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
