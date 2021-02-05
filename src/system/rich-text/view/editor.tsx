import { touchObject } from "@dabsi/common/object/touchObject";
import { WeakId } from "@dabsi/common/WeakId";
import { Hookable } from "@dabsi/modules/Hookable";
import { View } from "@dabsi/react/view/View";
import { ViewState } from "@dabsi/react/view/ViewState";
import { RichTextStore } from "@dabsi/system/rich-text/common/store";
import RichTextEditorBlock from "@dabsi/system/rich-text/view/RichTextEditorBlock";
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
import "./hooks/delete-atomic-block";
import "./hooks/split-block";

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
      decorator: Draft.CompositeDecorator;
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

export class RichTextEditor<P = {}> extends View<
  {
    connection: RpcConnection<RpcNamespace>;
  } & P
> {
  @ViewState("updateEditorState")
  editorState: EditorState = EditorState.createEmpty();

  onChange = Hookable.sync();

  onInit = Hookable.sync();

  onDestroy = Hookable.sync();

  compositeDecorator!: CompositeDecorator;

  decorators: Draft.DraftDecorator[] = [];

  toolbars: ComponentType<{ isLast: boolean }>[] = [];

  hooks: (() => void)[] = [];

  instance: Editor | null = null;

  store: RichTextStore = new RichTextStore(
    () => this.editorState,
    value => {
      this.editorState = value;
    }
  );

  useHook<T extends object>(callback: () => T): T {
    const o: any = {};
    this.hooks.push(() => {
      Object.setPrototypeOf(o, callback());
    });
    return o;
  }
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

  handleKeyCommandMap: Record<
    string,
    (key: string) => "handled" | "not-handled"
  > = {};

  blockRendererFnMap: {
    [K in string]: (
      block: Draft.ContentBlock
    ) => Draft.BlockRendererOptions | void;
  } = {
    atomic: block => {
      const entityKey = block.getEntityAt(0);
      if (!entityKey) return;
      const entity = this.store.content.getEntity(entityKey);
      const renderer = this.atomicBlockRendererMap[entity?.getType()];

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

  atomicBlockRendererMap: {
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
      return (
        renderer?.(block) || {
          component: RichTextEditorBlock,
          editable: true,
        }
      );
    },
    keyBindingFn: event => {
      const callbacks = this._bindingKeyMap[event.key];
      for (const callback of callbacks || []) {
        const result = callback(event);
        if (result !== undefined) return result;
      }
      return getDefaultKeyBinding(event);
    },
    handleKeyCommand: key => {
      return this.handleKeyCommandMap[key]?.(key) || "not-handled";
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

    return this.renderContainer(
      <>
        {this.renderToolbar()}
        {this.renderEditor()}
      </>
    );
  };

  renderContainer(content: React.ReactElement): React.ReactElement {
    return content;
  }

  renderToolbar(): React.ReactNode {
    return this.toolbars.map((Toolbar, index) => (
      <Toolbar
        key={WeakId(Toolbar)}
        isLast={this.toolbars.length - index === 1}
      />
    ));
  }

  renderEditor(): React.ReactNode {
    return (
      <Editor
        {...this.editorProps}
        editorState={this.editorState}
        ref={instance => {
          this.instance = instance;
        }}
      />
    );
  }

  renderView() {
    return <this.Component />;
  }
}