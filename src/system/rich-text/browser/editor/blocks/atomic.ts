import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Like } from "@dabsi/common/typings2/_";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextEditorBlock } from "@dabsi/system/rich-text/browser/editor/editorBlock";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import React from "react";

declare global {
  namespace IRichText {
    interface Editor extends Like<typeof RichTextEditorAtomicBlock> {}
  }
}

export namespace RichTextEditorAtomicBlock {
  export type Props<
    T extends RichTextEntity.Type = any
  > = RichTextEditorBlock.Props<"atomic"> & {
    store: RichTextStore;
    block: Draft.ContentBlock;
    entity: Draft.Entity;
    entityType: T;
    entityData: RichTextEntity.UnpackedData<T>;
  };

  export type Options<T extends RichTextEntity.Type> = {
    editable?: boolean;
    render: (props: Props<T>) => React.ReactElement;
  };

  export type Wrapper = (
    element: React.ReactElement,
    props: Props<any>
  ) => React.ReactElement;
}

const getProps = WeakMapFactory((editor: RichTextEditor) => {
  return {
    wrappers: [] as RichTextEditorAtomicBlock.Wrapper[],
    blockOptionsMap: {} as Record<
      string,
      RichTextEditorAtomicBlock.Options<any>
    >,
  };
});

export namespace RichTextEditorAtomicBlock {
  export function defineAtomicBlock<T extends RichTextEntity.Type>(
    this: RichTextEditor,
    entityType: T,
    options: RichTextEditorAtomicBlock.Options<T>
  ): RichTextEditor {
    Object.defineProperty(getProps(this).blockOptionsMap, entityType, {
      configurable: false,
      value: options,
    });
    return this;
  }
  export function wrap(
    this: RichTextEditor,
    ...wrappers: RichTextEditorAtomicBlock.Wrapper[]
  ): RichTextEditor {
    getProps(this).wrappers.push(...wrappers);
    return this;
  }
}

Object.defineProperties(
  RichTextEditor.prototype,
  Object.getOwnPropertyDescriptors(RichTextEditorAtomicBlock)
);

RichTextEditorGlobals.builders.push(editor => {
  const props = getProps(editor);
  editor.defineBlockStyleFn("atomic", ({ block, store }) => {
    const entity = store.getEntityAt(block.getKey(), 0);
    if (entity) {
      return `rt-atomic-${entity.getType()}`;
    }
  });

  editor.defineBlock("atomic", {
    render: blockProps => {
      const renderError = (msg: React.ReactNode) =>
        React.createElement(React.Fragment, null, msg);

      const { block, store } = blockProps;
      const entityKey = block.getEntityAt(0);
      if (!entityKey) {
        return renderError(`No entity-key for atomic block.`);
      }
      const entity = store.content.getEntity(entityKey);
      if (!entity) {
        return renderError(`No entity for atomic block.`);
      }
      const entityType = entity.getType();
      const options = props.blockOptionsMap[entityType];
      if (!options) {
        return renderError(`No defined entity "${entityType}".`);
      }
      const entityData = entity.getData();
      const atomicBlockProps: RichTextEditorAtomicBlock.Props<any> = {
        ...blockProps,
        entityType,
        entity,
        block,
        store,
        entityData,
      };

      let element = options.render(atomicBlockProps);
      for (const wrapper of props.wrappers) {
        element = wrapper(element, atomicBlockProps);
      }
      return element;
    },
  });
});
