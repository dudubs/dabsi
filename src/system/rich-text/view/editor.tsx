import { touchObject } from "@dabsi/common/object/touchObject";
import { WeakId } from "@dabsi/common/WeakId";
import { Hookable } from "@dabsi/modules/Hookable";
import { ReactWrapper } from "@dabsi/react/ReactWrapper";
import { View } from "@dabsi/react/view/View";
import { ViewState } from "@dabsi/react/view/ViewState";
import { RichTextStore } from "@dabsi/system/rich-text/common/store";
import RichTextEditorPlugins from "@dabsi/system/rich-text/view/RichTextEditorPlugins";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import {
  CompositeDecorator,
  Editor,
  EditorState,
  getDefaultKeyBinding,
} from "draft-js";
import { List } from "immutable";
import React, { ComponentType, createElement, useEffect } from "react";
import "./commands/insertAtomicBlock";
import "./hooks/_atomicBlock";
import "./_devPlugin";

declare global {
  namespace Draft {
    type BlockComponentProps<P = {}> = {
      contentState: Draft.ContentState;
      block: Draft.ContentBlock;
      blockProps: P;
      blockStyleFn;
      customStyleFn;
      direction;
      forceSelection: boolean;
      offsetKey;
      tree: List<any>;
      dcorator: Draft.CompositeDecorator;
      selection: Draft.SelectionState;
      preventScroll;
    };

    type BlockRendererOptions<T = {}> = {
      component: ComponentType<BlockComponentProps<T>>;
      editable?: boolean;
      props?: any;
    };

    type KeyBindingFn = (
      event: React.KeyboardEvent
    ) => Draft.DraftEditorCommand | null;
  }
}

export type RichTextEditorPlugin = (editor: RichTextEditor) => void;

declare global {
  namespace IRichText {
    interface Editor {}
    interface AtomicBlockData {}
  }
}

export interface RichTextEditor extends IRichText.Editor {}

export type RichTextAtomicBlockDataComponentProps<
  K extends keyof IRichText.AtomicBlockData
> = {
  draftProps: Draft.BlockComponentProps;
  data: IRichText.AtomicBlockData[K];
};

declare global {
  namespace IRichText {
    export type AtomicBlockComponentProps = {
      entity: Draft.EntityInstance;
      entityData: any;
      entityKey: string;
      editor: RichTextEditor;
    };
    export type AtomicBlockComponent = ComponentType<AtomicBlockComponentProps>;

    export type AtomicBlockOptions = {
      component: AtomicBlockComponent;
      editable?: boolean;
    };
  }
}

export class RichTextEditor extends View<{
  connection: RpcConnection<RpcNamespace>;
}> {
  @ViewState("updateEditorState")
  editorState: EditorState = EditorState.createEmpty();

  onChange = Hookable.sync();

  onInit = Hookable.sync();

  onDestroy = Hookable.sync();

  compositeDecorator!: CompositeDecorator;

  decorators: Draft.DraftDecorator[] = [];

  toolbar: ComponentType[] = [];

  wrappers: ReactWrapper[] = [];

  hooks: (() => void)[] = [];

  store: RichTextStore = new RichTextStore(
    () => this.editorState,
    value => {
      this.editorState = value;
    }
  );

  protected _bindingKeyMap: Record<
    string,
    Set<(event: React.KeyboardEvent) => void | null | Draft.DraftEditorCommand>
  > = {};

  constructor(props) {
    super(props);

    for (const plugin of RichTextEditorPlugins) {
      plugin(this);
    }
    this.onInit.invoke();
  }

  updateEditorState() {
    this.isDidMount && this.onChange.invoke();
  }

  componentWillUnmount() {
    super.componentDidMount();
    this.onDestroy.invoke();
  }

  AtomicBlockComponent = ({ blockProps: { options, ...blockProps } }) => {
    return createElement(options.component, blockProps);
  };

  bindKey(
    key: string,
    callback: (
      event: React.KeyboardEvent
    ) => null | void | Draft.DraftEditorCommand
  ) {
    const callbacks = touchObject(this._bindingKeyMap, key, () => new Set());
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  }

  blockRendererFnMap: {
    [K in string]: (
      block: Draft.ContentBlock
    ) => Draft.BlockRendererOptions | void;
  } = {
    atomic: block => {
      const entityKey = block.getEntityAt(0);
      if (!entityKey) return;
      const entity = this.store.content.getEntity(entityKey);
      const renderer = this.atomicBlockRendererFnMap[entity?.getType()];

      const options = renderer?.({
        entity,
        entityKey,
        block,
      });
      if (options) {
        return {
          ...options,
          component: this.AtomicBlockComponent as any,
          props: {
            options,
            entity,
            entityKey,
            entityData: entity.getData(),
          },
        };
      }
    },
  };

  atomicBlockRendererFnMap: {
    [K in string]: (props: {
      entityKey: string;
      entity: Draft.EntityInstance;
      block: Draft.ContentBlock;
    }) => IRichText.AtomicBlockOptions | void;
  } = {};

  editorProps: Omit<Draft.EditorProps, "editorState"> = {
    onChange: (editorState: EditorState) => {
      this.editorState = editorState;
    },
    blockRendererFn: block => {
      const renderer = this.blockRendererFnMap[block.getType()];
      return renderer?.(block);
    },
    keyBindingFn: event => {
      const callbacks = this._bindingKeyMap[event.key];
      for (const callback of callbacks || []) {
        const result = callback(event);
        if (result !== undefined) return result;
      }
      return getDefaultKeyBinding(event);
    },
  };

  Component = () => {
    useEffect(() => {
      this.onInit.invoke();
      return () => {
        this.onDestroy.invoke();
      };
    }, []);

    this.hooks.forEach(hook => {
      hook();
    });

    return ReactWrapper.wrapAll(
      <>
        {this.toolbar.map(Toolbar => (
          <Toolbar key={WeakId(Toolbar)} />
        ))}
        <Editor {...this.editorProps} editorState={this.editorState} />
      </>,
      this.wrappers
    );
  };

  renderView() {
    return <this.Component />;
  }
}
