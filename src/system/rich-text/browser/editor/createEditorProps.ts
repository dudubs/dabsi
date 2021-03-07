import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextEditorBlock } from "@dabsi/system/rich-text/browser/editor/editorBlock";
import clsx from "clsx";
import {
  DefaultDraftBlockRenderMap,
  EditorBlock,
  EditorState,
  getDefaultKeyBinding,
} from "draft-js";
import React from "react";

declare global {
  namespace IRichText {
    interface EditorProps {
      onBlur?(event: React.SyntheticEvent<any>);
      onFocus?(event: React.SyntheticEvent<any>);
    }
  }
}
export default function (
  this: RichTextEditor
): Omit<Draft.EditorProps, "editorState"> {
  return {
    onChange: (editorState: EditorState) => {
      this.editorState = editorState;
    },

    blockRenderMap: DefaultDraftBlockRenderMap.merge({
      regular: { element: "div" },
      atomic: { element: "div" },
    }),

    handleDrop: (selection, dataTransfer, isInternal) => {
      console.log({ selection, dataTransfer, isInternal });

      return "handled";
    },

    onFocus: event => {
      if (this.props.parent) {
        this.setCurrentStore(this.store);
        this.props.parent.readOnlyBecauseChild = true;
      }
      this.props.onFocus?.(event);
    },

    onBlur: event => {
      if (this.props.parent) {
        this.setCurrentStore(null);
        this.props.parent.readOnlyBecauseChild = false;
      }
      this.props.onBlur?.(event);
    },
    blockRendererFn: block => {
      const blockType = block.getType();

      const {
        render = ({ blockComponentProps }) =>
          React.createElement(EditorBlock, blockComponentProps),
      } = this._blockOptionsMap[blockType] || {};

      const editable = this.isEditableBlock(block.type);

      return {
        editable,
        component: RichTextEditorBlock,
        props: {
          editor: this,
          store: this.store,
          block,
          blockType,
          editable,
          render,
          wrappers: this.blockWrappers,
        } as RichTextEditorBlock.ComponentProps,
      };
    },
    blockStyleFn: block => {
      const blockType = block.getType();
      const depth = block.get("depth");
      const data = block.getData();
      const align = data.get("style-align");

      // || this.defaultDirection == "LTR"
      //   ? "LEFT"
      //   : "RIGHT";
      const direction = data.get("style-direction") || this.defaultDirection;
      const layout = data.get("style-layout");

      return clsx(
        `rt-block`,
        `rt-block-${blockType}`,
        `rt-${
          this.isEditableBlock(block.type) ? "editable" : "readonly"
        }-block`,
        align && `rt-align-${align}`,
        `rt-depth-${depth || 0}`,
        `rt-direction-${direction}`,
        layout && "rt-layout-" + (layout || "BLOCK"),
        this._blockStyleFnMap[blockType]?.({
          store: this.store,
          block,
          blockData: data.get("block-" + blockType) || {},
          blockType,
        })
      );
    },
    keyBindingFn: event => {
      const callback = this._bindingKeyMap[event.key];
      const result = callback?.(event, this.store);
      if (result || result === null) return result;
      return getDefaultKeyBinding(event);
    },
    handleKeyCommand: key => {
      console.log({ keyCommand: key });

      return this._handleKeyCommandMap[key]?.(this.store, key) || "not-handled";
    },
  };
}
