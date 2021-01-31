import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { OmitParameter } from "@dabsi/common/typings2/Fn";
import { RichTextCommands } from "@dabsi/system/rich-text/common/commands";
import { ContentState, EditorState, Modifier, SelectionState } from "draft-js";

export class RichTextStore {
  constructor(
    protected getter: () => EditorState,
    protected setter: (state: EditorState) => void
  ) {}

  get state(): EditorState {
    return this.getter();
  }

  set state(value: EditorState) {
    this.setter(value);
  }

  get content(): ContentState {
    return this.state.getCurrentContent();
  }

  get selection(): SelectionState {
    return this.state.getSelection();
  }

  command<
    K extends ExtractKeys<
      IRichText.Commands,
      (store: RichTextStore, ...args: any[]) => any
    >
  >(
    method: K,
    ...args: OmitParameter<IRichText.Commands[K]>
  ): ReturnType<IRichText.Commands[K]> {
    if (!RichTextCommands[method]) {
      throw new Error(`No rich-text command like "${method}".`);
    }
    return (RichTextCommands[method] as any)(this, ...args);
  }

  call<
    K extends ExtractKeys<
      typeof EditorState,
      (editorState: EditorState, ...args: any[]) => void
    >
  >(
    method: K,
    ...args: OmitParameter<typeof EditorState[K]>
  ): ReturnType<typeof EditorState[K]> {
    return (EditorState[method] as any)(this.state, ...args);
  }

  update<
    K extends ExtractKeys<
      typeof EditorState,
      (editorState: EditorState, ...args: any[]) => EditorState
    >
  >(method: K, ...args: OmitParameter<typeof EditorState[K]>): this {
    this.state = (EditorState[method] as any)(this.state, ...args);
    return this;
  }

  modifierCall<
    K extends ExtractKeys<
      typeof Modifier,
      (content: ContentState, ...args: any[]) => void
    >
  >(
    method: K,
    ...args: OmitParameter<typeof Modifier[K]>
  ): ReturnType<typeof Modifier[K]> {
    return (Modifier[method] as any)(this.content, ...args);
  }
}
