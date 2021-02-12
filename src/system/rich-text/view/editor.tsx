import { touchObject } from "@dabsi/common/object/touchObject";
import { Hookable } from "@dabsi/modules/Hookable";
import { View } from "@dabsi/react/view/View";
import { ViewState } from "@dabsi/react/view/ViewState";
import RichTextEditorBlock from "@dabsi/system/rich-text/view/editorBlock";
import { RichTextEditorPlugins } from "@dabsi/system/rich-text/view/editorPlugins";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import { RichTextEditorKeyCommand } from "@dabsi/system/rich-text/view/types";
import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import clsx from "clsx";
import {
  CompositeDecorator,
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  genKey,
  getDefaultKeyBinding,
} from "draft-js";
import { List } from "immutable";
import React, {
  ComponentType,
  createElement,
  useEffect,
  useMemo,
  useState,
} from "react";
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
      block: Draft.ContentBlock;
      contentState: Draft.ContentState;
      selection: Draft.SelectionState;
    };
    export type AtomicBlockComponent = ComponentType<AtomicBlockComponentProps>;

    export type AtomicBlockOptions = {
      component?: AtomicBlockComponent;
      editable?: boolean;
    };
  }
}
export class RichTextEditor extends View<{
  connection: RpcConnection<RpcNamespace>;
}> {
  @ViewState("updateEditorState")
  editorState: EditorState = EditorState.createWithContent(
    convertFromRaw({
      blocks: [
        {
          type: "regular",
          key: genKey(),
          text: " ",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    })
  );

  onChange = Hookable.sync();

  changeCallbacks = new Set<(store: RichTextStore) => void>();

  onInit = Hookable.sync();

  onDestroy = Hookable.sync();

  compositeDecorator!: CompositeDecorator;

  decorators: Draft.DraftDecorator[] = [];

  hooks: (() => void)[] = [];

  instance: Editor | null = null;

  store: RichTextStore = new RichTextStore(
    () => this.editorState,
    value => {
      this.editorState = value;
    }
  );

  useChange<T>(callback: (store: RichTextStore) => T): T {
    const [state, setState] = useState(() => callback(this.store));
    useEffect(() => {
      const onChange = () => {
        setState(callback(this.store));
      };
      this.changeCallbacks.add(onChange);
      return () => {
        this.changeCallbacks.delete(onChange);
      };
    }, [this]);
    return state;
  }

  useConnection<T extends AnyRpc>(rpc: T): RpcConnection<T> {
    return useMemo(() => this.props.connection.getChild(rpc), [
      this.props.connection,
    ]);
  }
  protected _bindingKeyMap: Record<
    string,
    Set<(event: React.KeyboardEvent, store: RichTextStore) => any>
  > = {};

  constructor(props) {
    super(props);

    if (this.constructor === RichTextEditor) {
      this.init();
    }
  }

  initPlugins() {
    for (const plugin of RichTextEditorPlugins) {
      plugin(this);
    }
  }
  init() {
    this.initPlugins();
    this.onInit.invoke();
  }

  useHook<T extends object>(callback: () => T): T {
    const o: any = {};
    this.hooks.push(() => {
      Object.setPrototypeOf(o, callback());
    });
    return o;
  }

  protected _changeImmediateId: ReturnType<typeof setImmediate> | null = null;

  updateEditorState() {
    if (!this._changeImmediateId) {
      this._changeImmediateId = setImmediate(() => {
        this.isDidMount && this.onChange.invoke();
        this._changeImmediateId = null;
        this.changeCallbacks?.forEach(callback => {
          callback(this.store);
        });
      });
    }
  }

  componentWillUnmount() {
    super.componentDidMount();
    this.onDestroy.invoke();
  }

  AtomicBlockComponent = props => {
    const {
      blockProps: {
        options: { component },
      },
    } = props;
    return this.wrapAtomicBlock(createElement(component, props), props);
  };

  bindKey(
    key: string,
    callback: (
      event: React.KeyboardEvent,
      store: RichTextStore
    ) => null | void | RichTextEditorKeyCommand
  ) {
    const callbacks = touchObject(this._bindingKeyMap, key, () => new Set());
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  }

  protected _handleKeyCommandMap: Record<
    RichTextEditorKeyCommand,
    (store: RichTextStore, key: string) => "handled" | "not-handled"
  > = {} as any;

  defineKeyCommand(
    k: RichTextEditorKeyCommand,
    callback: (store: RichTextStore, key: string) => "handled" | "not-handled"
  ): this {
    this._handleKeyCommandMap[k] = callback;
    return this;
  }

  handleKeyCommand(
    k: RichTextEditorKeyCommand,
    callback: (store: RichTextStore, key: string) => void
  ): this {
    return this.defineKeyCommand(k, (store, key) => {
      callback(store, key);
      return "handled";
    });
  }

  wrapAtomicBlock(element: React.ReactElement, props: any): React.ReactElement {
    return element;
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
      if (!entity) return;
      const entityType = entity.getType();

      const renderer = this.atomicBlockRendererMap[entityType];
      if (!renderer) {
        log.warn(`no render for entity type "${entityType}".`);
      }

      const options = renderer?.({
        entity,
        entityKey,
        block,
      });
      if (!options) return;

      if (options) {
        return {
          edtiable: false,
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

    blockRenderMap: DefaultDraftBlockRenderMap.merge({
      regular: { element: "div" },
      atomic: { element: "div" },
    }),

    blockRendererFn: block => {
      const renderer = this.blockRendererFnMap[block.getType()];

      return (
        renderer?.(block) || {
          component: RichTextEditorBlock,
          editable: true,
        }
      );
    },
    blockStyleFn: block => {
      const type = block.getType();
      const depth = block.get("depth");
      const data = block.getData();
      const align = data.get("style-align");
      const direction = data.get("style-direction") || "LTR";
      const typeData = data.get("block-" + type);

      return clsx(
        `rt-block`,
        `rt-block-${type}`,
        align && `rt-align-${align}`,
        `rt-depth-${depth || 0}`,
        `rt-direction-${direction}`,
        this.blockStyleFnMap[type]?.(typeData, block, this.store.content)
      );
    },
    keyBindingFn: event => {
      const callbacks = this._bindingKeyMap[event.key];
      for (const callback of callbacks || []) {
        const result = callback(event, this.store);
        if (result === null) return null;
        if (result !== undefined) return result;
      }
      return getDefaultKeyBinding(event);
    },
    handleKeyCommand: key => {
      console.log({ keyCommand: key });

      return this._handleKeyCommandMap[key]?.(this.store, key) || "not-handled";
    },
  };

  atomicBlockStyleFnMap: Record<
    string,
    (
      entity: Draft.Entity,
      block: Draft.ContentBlock,
      content: Draft.ContentState
    ) => string | undefined
  > = {};

  blockStyleFnMap: Record<
    string,
    (
      data: any,
      block: Draft.ContentBlock,
      content: Draft.ContentState
    ) => string | undefined
  > = {
    atomic: (data, block, content) => {
      const entityKey = block.getEntityAt(0);
      if (!entityKey) return;
      const entity = content.getEntity(entityKey);
      if (!entity) return;
      // const entityData = entity.getData();
      return clsx(
        `rt-atomic-${entity.getType()}`,
        (entity &&
          this.atomicBlockStyleFnMap[entity.getType()]?.(
            entity,
            block,
            content
          )) ||
          undefined
      );
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

    return this.renderEditor();
  };

  renderEditor(): React.ReactElement {
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
