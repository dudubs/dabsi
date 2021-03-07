import TableIcon from "@dabsi/system/rich-text-plugins/table/browser/TableIcon";
import { MuiEditorButton } from "@dabsi/system/rich-text/browser/editor/mui/button";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextEditorBlock } from "@dabsi/system/rich-text/browser/editor/editorBlock";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { RichTextEditorRaw } from "@dabsi/system/rich-text/browser/editor/raw";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

type EditorTableCellProps = {
  index: number;
  props: RichTextEditorBlock.Props<"table">;
  refMap: Record<string, RichTextEditor | null>;
};
declare global {
  namespace IRichText {
    interface EditorProps {
      tableCell?: EditorTableCellProps;
    }
    interface EditorKeyCommands {
      "table.next-cell";
      "table.prev-cell";
    }
  }
}

RichTextEditorGlobals.builders.push(({ editor }) => {
  if (!editor.props.tableCell) return;

  const current = {
    get tableCell() {
      return editor.props.tableCell!;
    },
    get cells() {
      return current.tableCell.props.blockData.cells;
    },
    get cellIndex() {
      return current.tableCell.index;
    },
    get store() {
      return this.tableCell.props.store;
    },
    get block() {
      return current.tableCell.props.block;
    },
  };

  editor.bindKey("Tab", event => {
    return event.shiftKey ? "table.prev-cell" : "table.next-cell";
  });
  editor
    .handleKeyCommand("table.next-cell", () => {
      const cell = current.cells[current.cellIndex + 1];
      if (!cell) {
        current.store.insertTableRow(current.block.key);
      } else {
        current.tableCell.refMap[cell.key]!.instance?.focus();
      }
    })
    .handleKeyCommand("table.prev-cell", () => {
      const cell = current.cells[current.cellIndex - 1];
      if (!cell) {
        // TODO: add new row
      } else {
        current.tableCell.refMap[cell.key]!.instance?.focus();
      }
    });
});

RichTextEditorGlobals.mui.builders.push(
  ({ editor: { store, muiToolbarMap }, editor }) => {
    muiToolbarMap.adding.push(() => {
      return (
        <MuiEditorButton
          icon={<TableIcon />}
          onClick={() => {
            store.insertTable();
          }}
        />
      );
    });
    editor.defineBlock("table", {
      render: props => {
        const { blockData, block } = props;

        const [refMap] = React.useState(
          {} as Record<string, RichTextEditor | null>
        );

        let cellNodes: React.ReactNode[] = [];
        let rowNodes: React.ReactNode[] = [];

        for (const [cellIndex, cell] of blockData.cells.entries()) {
          pushCellNode(
            <TableCell
              key={cell.key}
              onMouseDown={() => {
                refMap[cell.key]!.instance?.focus();
              }}
            >
              <RichTextEditor
                ref={cellEditor => {
                  if (cellEditor) refMap[cell.key] = cellEditor;
                }}
                tableCell={{ index: cellIndex, props, refMap }}
                connection={editor.props.connection}
                parent={editor}
                content={cell.content}
                // editable={false}
                onBlur={() => {
                  const content = RichTextEditorRaw.fromRawContentState(
                    refMap[cell.key]!.store.rawContent
                  );
                  store.updateBlockData("table", block.key, data => ({
                    ...data,
                    cells: data.cells.map((cell, i) => {
                      if (i === cellIndex) {
                        return { ...cell, content: content };
                      }
                      return cell;
                    }),
                  }));
                }}
              />
            </TableCell>
          );
        }

        function pushCellNode(cellNode: React.ReactNode) {
          cellNodes.push(cellNode);
          if (cellNodes.length === blockData.columns) {
            rowNodes.push(
              <TableRow key={rowNodes.length}>{cellNodes}</TableRow>
            );
            cellNodes = [];
          }
        }

        return (
          <Table size="small">
            <TableBody>{rowNodes}</TableBody>
          </Table>
        );
      },
    });
  }
);
