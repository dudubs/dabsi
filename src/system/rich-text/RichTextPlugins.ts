import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import RichTextModule from "@dabsi/system/rich-text";
import {
  RichTextBlockType,
  RichTextConfig,
  RichTextElement,
  RichTextEntityType,
} from "@dabsi/system/rich-text/common/RichText";
import {
  RichTextInputConfig,
  RichTextInputElement,
} from "@dabsi/system/rich-text/common/RichTextInput";
import {
  RichTextBlockHandler,
  RichTextBlockHandlerOptions,
} from "@dabsi/system/rich-text/RichTextBlockHandler";
import {
  RichTextEntityHandler,
  RichTextEntityHandlerOptions,
  RichTextEntitySelection,
} from "@dabsi/system/rich-text/RichTextEntityHandler";

export class RichTextPlugins {
  buildInputElement = Hookable<
    (config: RichTextConfig, element: RichTextElement) => Awaitable
  >();

  buildElement = Hookable<
    (config: RichTextInputConfig, element: RichTextInputElement) => Awaitable
  >();

  styleTypes = new Set<string>();

  protected _entityTypeHandlerMap: Record<
    string,
    RichTextEntityHandler<RichTextEntityType>
  > = {};

  protected _blockTypeHandlerMap: Record<
    string,
    RichTextBlockHandler<RichTextBlockType>
  > = {};

  getEntityHandler(type: string): RichTextEntityHandler {
    return this._entityTypeHandlerMap[type];
  }

  getBlockHandler(type: string): RichTextBlockHandler {
    return this._blockTypeHandlerMap[type];
  }

  defineBlock<K extends RichTextBlockType>(
    type: K,
    options: RichTextBlockHandlerOptions<K>
  ) {
    this._blockTypeHandlerMap[type] = RichTextBlockHandler(options);
  }

  defineEntity<
    K extends RichTextEntityType,
    Selection extends RichTextEntitySelection<K> = {},
    PackSelection extends RichTextEntitySelection<K> = Selection,
    UnpackSelection extends RichTextEntitySelection<K> = Selection,
    RemoveSelection extends RichTextEntitySelection<K> = UnpackSelection,
    ReadonlySelection extends RichTextEntitySelection<K> = UnpackSelection
  >(
    type: K,
    options: RichTextEntityHandlerOptions<
      K,
      Selection,
      PackSelection,
      UnpackSelection,
      RemoveSelection,
      ReadonlySelection
    >
  ) {
    this._entityTypeHandlerMap[type] = <any>RichTextEntityHandler(options);
  }
}
