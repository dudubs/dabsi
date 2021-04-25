import { WeakId } from "@dabsi/common/WeakId";
import { Hookable } from "@dabsi/modules/Hookable";
import createEditorProps from "@dabsi/system/rich-text/browser/editor/createEditorProps";
import { RichTextEditorBlock } from "@dabsi/system/rich-text/browser/editor/editorBlock";
import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { RichTextEditorRaw } from "@dabsi/system/rich-text/browser/editor/raw";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { RichTextEditorKeyCommand } from "@dabsi/system/rich-text/browser/editor/types";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { AnyRpc, RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { RpcNamespace } from "@dabsi/old-typerpc/namespace/rpc";
import { ReactContext } from "@dabsi/view/react/context";
import { View } from "@dabsi/view/react/component/View";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import clsx from "clsx";
import { CompositeDecorator, Editor, EditorState } from "draft-js";
import { List } from "immutable";
import React, { ComponentType, useEffect, useState } from "react";

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

    type BlockRendererOptions = {
      component: ComponentType<BlockComponentProps>;
      editable?: boolean;
      props?: any;
    };

    type KeyBindingFn = (
      event: React.KeyboardEvent
    ) => Draft.DraftEditorCommand | null;
  }
}

declare global {
  namespace IRichText {
    interface EditorProps {}
    interface Editor {}
  }
}

export interface RichTextEditor extends IRichText.Editor {}

export type RichTextEditorBlockStyleProps<T extends RichTextBlock.Type> = {
  store: RichTextStore;
  block: Draft.ContentBlock;
  blockType: T;
  blockData: RichTextBlock.UnpackedData<T>;
  defaultContent?: RichTextContent.Unpacked;
};
export type RichTextEditorProps = IRichText.EditorProps & {
  connection: RpcConnection<RpcNamespace>;
  parent?: RichTextEditor;
  content?: RichTextContent.Unpacked | null;
  editable?: boolean;
};
export class RichTextEditor extends View<RichTextEditorProps> {
  @ViewState() readOnlyBecauseChild: boolean = false;
  @ViewState() readOnlyBecauseBlock: boolean = false;

  @ViewState("updateEditorState")
  editorState: EditorState = EditorState.createWithContent(
    RichTextEditorRaw.toContentState(
      this.props.content || RichTextContent.createEmpty()
    )
  );

  get editor(): RichTextEditor {
    return this;
  }
  onChange = Hookable.sync();

  changeCallbacks = new Set<(store: RichTextStore) => void>();

  onInit = Hookable.sync();

  onDestroy = Hookable.sync();

  compositeDecorator!: CompositeDecorator;

  decorators: Draft.DraftDecorator[] = [];

  hooks: (() => void)[] = [];

  wrappers: ((
    element: React.ReactElement,
    store: RichTextStore
  ) => React.ReactElement)[] = [];

  instance: Editor | null = null;

  store: RichTextStore = new RichTextStore(
    () => this.editorState,
    value => {
      this.editorState = value;
    }
  );

  @ViewState() defaultDirection: "RTL" | "LTR" = "LTR";

  _currentStore: null | RichTextStore = null;

  get currentStore(): RichTextStore {
    if (this.props.parent) {
      return this.props.parent.currentStore;
    }
    return this._currentStore || this.store;
  }

  setCurrentStore(store: null | RichTextStore) {
    if (this.props.parent) {
      return this.props.parent.setCurrentStore(store);
    }

    this._currentStore = store;
    this.emitChange();
  }

  listen(callback: () => void): () => void {
    this.changeCallbacks.add(callback);
    return () => {
      this.changeCallbacks.delete(callback);
    };
  }

  get root(): RichTextEditor {
    return this.props.parent || this;
  }

  useStore(): RichTextStore {
    if (this.props.parent) return this.props.parent.useStore();
    const [state, setState] = useState(this.currentStore);

    useEffect(
      () =>
        this.listen(() => {
          setState(this.currentStore);
        }),
      [this]
    );

    return state;
  }

  getConnection<T extends AnyRpc>(rpc: T): RpcConnection<T> {
    return this.props.connection.getChild(rpc);
  }
  protected _bindingKeyMap: Record<
    string,
    null | ((event: React.KeyboardEvent<any>, store: RichTextStore) => any)
  > = {};

  constructor(props) {
    super(props);

    for (const plugin of RichTextEditorGlobals.builders) {
      plugin(this);
    }
  }

  useHook<T extends object>(callback: () => T): T {
    const o: any = {};
    this.hooks.push(() => {
      Object.setPrototypeOf(o, callback());
    });
    return o;
  }

  protected _changeImmediateId: ReturnType<typeof setImmediate> | null = null;

  emitChange() {
    if (this.props.parent) return this.props.parent.emitChange();
    this.onChange.invoke();
    this.changeCallbacks?.forEach(callback => {
      callback(this.currentStore);
    });
  }

  updateEditorState() {
    if (this.isDidMount && !this._changeImmediateId) {
      this._changeImmediateId = setImmediate(() => {
        this._changeImmediateId = null;
        this.emitChange();
      });
    }
  }
  componentWillUnmount() {
    super.componentDidMount();
    this.onDestroy.invoke();
  }

  bindKey(
    key: string,
    callback: (
      event: React.KeyboardEvent,
      store: RichTextStore
    ) => null | void | RichTextEditorKeyCommand
  ) {
    const before = this._bindingKeyMap[key];
    this._bindingKeyMap[key] = (event, store) => {
      const result = callback(event, store);
      if (result || result === null) return result;
      return before?.(event, store);
    };
  }

  getContent(): RichTextContent.Unpacked {
    return RichTextEditorRaw.fromRawContentState(this.store.rawContent);
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

  blockWrappers: RichTextEditorBlock.Wrapper[] = [];

  protected _blockOptionsMap: Record<
    string,
    RichTextEditorBlock.Options<any>
  > = {};

  isEditableBlock(blockType: RichTextBlock.Type): boolean {
    const options = this._blockOptionsMap[blockType];
    if (options) {
      return options.editable ?? false;
    }
    return true;
  }

  defineBlock<T extends RichTextBlock.Type>(
    type: T,
    options: RichTextEditorBlock.Options<T>
  ): this {
    Object.defineProperty(this._blockOptionsMap, type, {
      configurable: false,
      value: options,
    });
    return this;
  }

  editorProps = createEditorProps.apply(this);

  defineBlockStyleFn<T extends RichTextBlock.Type>(
    type: T,
    callback: (props: RichTextEditorBlockStyleProps<T>) => string | undefined
  ): this {
    const prev = this._blockStyleFnMap[type];

    this._blockStyleFnMap[type] = props => {
      return clsx(prev?.(props), callback(props));
    };

    return this;
  }

  protected _blockStyleFnMap: Record<
    string,
    (props: RichTextEditorBlockStyleProps<any>) => string
  > = {};

  get readOnly() {
    return this.readOnlyBecauseBlock || this.readOnlyBecauseChild;
  }

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

    let element = (
      <Editor
        {...this.editorProps}
        editorState={this.editorState}
        ref={instance => {
          this.instance = instance;
        }}
        readOnly={this.readOnly}
      />
    );

    for (const wrapper of this.wrappers) {
      element = wrapper(element, this.store);
    }

    return element;
  };

  renderView() {
    return (
      // TODO: use React.Context
      <ReactContext provide={[this.store, this]}>
        <this.Component />
      </ReactContext>
    );
  }
}
