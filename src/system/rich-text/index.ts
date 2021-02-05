import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { Hookable } from "@dabsi/modules/Hookable";
import builtinPlugins from "@dabsi/system/rich-text/builtinPlugins";
import {
  RichTextBlockType,
  RichTextConfig,
  RichTextElement,
  RichTextEntityType,
} from "@dabsi/system/rich-text/common/types";
import {
  RichTextInputConfig,
  RichTextInputElement,
} from "@dabsi/system/rich-text/common/input";
import {
  RichTextBlockHandler,
  RichTextBlockHandlerOptions,
} from "@dabsi/system/rich-text/blockHandler";
import {
  RichTextEntityHandler,
  RichTextEntityHandlerOptions,
  RichTextEntitySelection,
} from "@dabsi/system/rich-text/entityHandler";
import { Inject, Module } from "@dabsi/typedi";
import { defined } from "@dabsi/common/object/defined";

export type RichTextModuleInstaller = {
  defineBlock<K extends RichTextBlockType>(
    type: K,
    options: RichTextBlockHandlerOptions<K>
  );

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
  );
};

@Module({
  dependencies: [DbModule],
})
export default class RichTextModule {
  install = Hookable<(installer: RichTextModuleInstaller) => void>();

  styleTypes = new Set<string>();

  entityTypeHandlerMap: Record<
    string,
    RichTextEntityHandler<RichTextEntityType> | undefined
  > = {};

  blockTypeHandlerMap: Record<
    string,
    RichTextBlockHandler<RichTextBlockType> | undefined
  > = {};

  buildInputElement = Hookable<
    (config: RichTextConfig, element: RichTextElement) => Awaitable
  >();

  buildElement = Hookable<
    (config: RichTextInputConfig, element: RichTextInputElement) => Awaitable
  >();

  async init() {
    this.install(builtinPlugins);
    this.install.invoke({
      defineBlock: (type, options) => {
        this.blockTypeHandlerMap[type] = RichTextBlockHandler(options);
      },
      defineEntity: (type, options) => {
        this.entityTypeHandlerMap[type] = <any>RichTextEntityHandler(options);
      },
    });
  }
  constructor(cli: Cli, public data: DataContext) {
    cli.command("start", cli => {
      cli.onRun(() => {
        this.init();
      });
    });
  }

  getEntityHandler(type: string): RichTextEntityHandler {
    return this.entityTypeHandlerMap[type]!;
  }

  getBlockHandler(type: string): RichTextBlockHandler {
    return defined(
      this.blockTypeHandlerMap[type],
      () => `No block handler for "${type}".`
    );
  }

  defineBlockHandler(type, handler: {}) {}

  defineEntityHandler() {}
}
