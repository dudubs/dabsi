import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import BoxInCenter from "@dabsi/system/acl/browser/BoxInCenter";
import MuiSystemViewComponents from "@dabsi/system/core/browser/MuiSystemViewComponents";
import SystemRouter from "@dabsi/system/core/common/SystemRouter";
import { MuiRichTextInputView } from "@dabsi/system/rich-text/browser/MuiRichTextInputView";
import useDevEditorState from "@dabsi/system/rich-text/browser/useDevEditorState";
import { RichTextInput } from "@dabsi/system/rich-text/common/RichTextInput";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import Router from "@dabsi/typerouter/Router";
import Button from "@material-ui/core/Button";
import {
  AtomicBlockUtils,
  CompositeDecorator,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState,
  RichUtils,
} from "draft-js";
import React from "react";

const DevRouter = SystemRouter.register("rich-text-dev", Router());

// ReactRouterView(DevRouter, { renderIndex: DevView });

type RichTextData = {
  text: string;
  styles: Omit<RawDraftContentState["blocks"][number], "text">[];
  entityMap: RawDraftContentState["entityMap"];
};

function fromRichTextData({
  text,
  styles,
  ...state
}: RichTextData): RawDraftContentState {
  const lines = text.split("\n");
  return {
    ...state,
    blocks: styles.map((style, index) => ({
      ...style,
      text: lines[index] || "",
    })),
  };
}

function toRichTextData({
  blocks,
  ...data
}: RawDraftContentState): RichTextData {
  let text = "";
  const styles = blocks.map(({ text: line, ...style }) => {
    text += (text ? "\n" : "") + line;
    return style;
  });
  return {
    ...data,
    text,
    styles,
  };
}

const editorDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      for (const x of contentBlock.getText().matchAll(/hello/g)) {
        callback(x.index!, x.index! + x[0].length);
      }
    },
    component: ({ children }) => {
      return <a href="#">{children}</a>;
    },
  },
]);

ReactRouterView(DevRouter, () => {
  const [editorState, setEditorState] = useDevEditorState(editorDecorator);

  return (
    <BoxInCenter>
      <MuiGrid direction="column" spacing={3}>
        <div>
          {" "}
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              const contentState = editorState.getCurrentContent();
              const contentStateWithEntity = contentState.createEntity(
                "IMAGE",
                "IMMUTABLE",
                {
                  time: new Date().getTime(),
                }
              );
              const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
              let nextEditorState = AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                " "
              );
              nextEditorState = EditorState.forceSelection(
                nextEditorState,
                nextEditorState.getCurrentContent().getSelectionAfter()
              );
              setEditorState(nextEditorState);
            }}
          >
            add image
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              console.log(
                JSON.stringify(
                  convertToRaw(editorState.getCurrentContent()),
                  null,
                  2
                )
              );
            }}
          >
            log raw content
          </Button>
        </div>
        <div>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            blockRendererFn={block => {
              if (block.getType() === "atomic") {
                const contentState = editorState.getCurrentContent();
                const entity = block.getEntityAt(0);
                if (!entity) return null;
                const type = contentState.getEntity(entity).getType();
                if (type === "image" || type === "IMAGE") {
                  return {
                    component: MyImage,
                    editable: false,
                  };
                }
              }
              return null;
            }}
            handleKeyCommand={(command, editorState) => {
              const newState = RichUtils.handleKeyCommand(editorState, command);
              if (newState) {
                setEditorState(newState);
                return "handled";
              }

              return "not-handled";
            }}
          />
        </div>
      </MuiGrid>
    </BoxInCenter>
  );
});

function MyImage(props) {
  console.log({ props });

  return <div>hello</div>;
}

MuiSystemViewComponents.push(use => {
  use(RichTextInput, props => <MuiRichTextInputView {...props} />);
});
