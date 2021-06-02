import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { EditorBlock } from "draft-js";
import React from "react";

export namespace RichTextEditorBlock {
  export type Props<T extends RichTextBlock.Type = any> = {
    store: RichTextStore;
    editable: boolean;
    block: Draft.ContentBlock;
    blockType: T;
    blockData: RichTextBlock.UnpackedData<T>;
    blockComponentProps: Draft.BlockComponentProps;
  };
  export type Renderer<T extends RichTextBlock.Type> = (
    props: Props<T>
  ) => React.ReactElement;

  export type Options<T extends RichTextBlock.Type> = {
    editable?: boolean;
    render?: Renderer<T>;
  };

  export type Wrapper = (
    element: React.ReactElement,
    props: Props<any>
  ) => React.ReactElement;

  export type ComponentProps = {
    store: RichTextStore;
    block: Draft.ContentBlock;
    blockType: string;
    wrappers: Wrapper[];
    editable: boolean;
    render: Renderer<any>;
    editor: RichTextEditor;
  };
}

export function RichTextEditorBlock(
  blockComponentProps: Draft.BlockComponentProps<RichTextEditorBlock.ComponentProps>
): React.ReactElement {
  const {
    blockProps: { store, block, blockType, render, wrappers, editable, editor },
  } = blockComponentProps;
  const props = {
    store,
    block,
    blockType,
    blockData: block.getData().get("block-" + blockType) || {},
    blockComponentProps,
    editable,
  };
  let element = render(props);
  for (const wrapper of wrappers) {
    element = wrapper(element, props);
  }
  return element;
}
