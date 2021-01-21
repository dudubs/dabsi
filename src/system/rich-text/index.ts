import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { DbModule } from "@dabsi/modules/DbModule";
import { Hookable } from "@dabsi/modules/Hookable";
import applyBuiltin from "@dabsi/system/rich-text/applyBuiltin";
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
import { DataResolver } from "@dabsi/system/storage/DataResolver";
import { Inject, Module } from "@dabsi/typedi";

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

  constructor(@Inject() cli: Cli, @Inject() public data: DataResolver) {
    cli.command("start", cli => {
      cli.onRun(() => {
        this.install(applyBuiltin);
        this.install.invoke({
          defineBlock: (type, options) => {
            this.blockTypeHandlerMap[type] = RichTextBlockHandler(options);
          },
          defineEntity: (type, options) => {
            this.entityTypeHandlerMap[type] = <any>(
              RichTextEntityHandler(options)
            );
          },
        });
      });
    });
  }

  getEntityHandler(type: string): RichTextEntityHandler {
    return this.entityTypeHandlerMap[type]!;
  }

  getBlockHandler(type: string): RichTextBlockHandler {
    return this.blockTypeHandlerMap[type]!;
  }
}
