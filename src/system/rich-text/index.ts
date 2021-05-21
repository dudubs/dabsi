import { defined } from "@dabsi/common/object/defined";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { Hookable } from "@dabsi/modules/Hookable";
import { DataSourceFactory2 } from "@dabsi/modules/DataSourceFactory2";
import { DbModule2 } from "@dabsi/modules/DbModule2";
import {
  RichTextBlockHandler,
  RichTextBlockOptions,
} from "@dabsi/system/rich-text/blockHandler";
import { RichTextBlockStyleHandler } from "@dabsi/system/rich-text/blockStyleHandler";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import {
  RichTextInputConfig,
  RichTextInputElement,
} from "@dabsi/system/rich-text/common/input";
import {
  RichTextConfig,
  RichTextElement,
  RichTextRelationType,
  RichTextRelationTypeKey,
} from "@dabsi/system/rich-text/common/types";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import {
  RichTextEntityHandler,
  RichTextEntityOptions,
} from "@dabsi/system/rich-text/entityHandler";
import { initRichTextModule } from "@dabsi/system/rich-text/init";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { Module } from "@dabsi/typemodule";
import { AnyRpc } from "@dabsi/old-typerpc/Rpc";
import { RpcError } from "@dabsi/old-typerpc/RpcError";
import "reflect-metadata";
import { ManyToOne, RelationOptions } from "typeorm";

@Module({
  dependencies: [DbModule2],
})
export default class RichTextModule {
  styleTypes = new Set<string>();

  buildInputElement = Hookable<
    (config: RichTextConfig, element: RichTextElement) => Awaitable
  >();

  buildElement = Hookable<
    (config: RichTextInputConfig, element: RichTextInputElement) => Awaitable
  >();

  protected _blockHandlerMap: Record<string, RichTextBlockHandler<any>> = {};
  protected _entityHandlerMap: Record<string, RichTextEntityHandler<any>> = {};
  protected _allowedRpcForReadonly = new Set<AnyRpc>();
  protected _blockStyleHandlerMap: Record<
    string,
    RichTextBlockStyleHandler<any>
  > = {};

  constructor(public getDataSoruce: DataSourceFactory2) {
    initRichTextModule(this);
  }

  assertReadonlyRpc(rpc: AnyRpc) {
    if (!this._allowedRpcForReadonly.has(rpc)) {
      throw new RpcError("Not allowed rpc.");
    }
  }

  defineReadonlyRpc(rpc: AnyRpc) {
    this._allowedRpcForReadonly.add(rpc);
  }

  defineBlock<T extends RichTextBlock.Type>(
    type: T,
    { unpack = data => data, ...handler }: RichTextBlockOptions<T> = {}
  ): this {
    this._blockHandlerMap[type] = { ...handler, unpack };
    return this;
  }

  getBlockHandler<T extends RichTextBlock.Type>(
    type: T
  ): RichTextBlockHandler<T> {
    return defined(
      this._blockHandlerMap[type],
      () => `No block handler for "${type}".`
    );
  }

  defineBlockStyle<T extends RichTextBlock.StyleType>(
    type: T,
    { ...handler }: RichTextBlockStyleHandler<T>
  ): this {
    this._blockStyleHandlerMap[type] = { ...handler };
    return this;
  }

  getBlockStyleHandler<T extends RichTextBlock.StyleType>(
    type: T
  ): RichTextBlockStyleHandler<T> {
    return defined(
      this._blockStyleHandlerMap[type],
      () => `No style handle for "${type}".`
    );
  }

  defineEntity<T extends RichTextEntity.Type>(
    type: T,
    { ...handler }: RichTextEntityOptions<T>
  ): this {
    this._entityHandlerMap[type] = {
      type,
      ...handler,
    };
    return this;
  }

  getEntityHandler<T extends RichTextEntity.Type>(
    type: T
  ): RichTextEntityHandler<T> {
    return defined(
      this._entityHandlerMap[type],
      () => `No entity handler for "${type}".`
    );
  }

  selectionBuilders = {
    forPacking: [] as ((config: RichTextConfig, selection) => void)[],
    forUnpacking: [] as ((config: RichTextConfig, selection) => void)[],
    forReadonly: [] as ((config: RichTextConfig, selection) => void)[],
  };

  createSelection(
    config: RichTextConfig,
    target: "forPacking" | "forUnpacking" | "forReadonly"
  ): DataSelection<RichTextRelation> {
    const selection = { pick: ["type"], relations: {} as {} } as const;
    for (const builder of this.selectionBuilders[target]) {
      builder(config, selection);
    }
    return selection;
  }

  defineRelation<T extends RichTextRelationTypeKey>(
    typeKey: T,
    entityType: Type<RichTextRelationType<T>>,
    {
      decoratorOptions,
      selection = {},
      packSelection = selection,
      unpackSelection = selection,
      readonlySelection = unpackSelection,
    }: {
      decoratorOptions?: RelationOptions;
      selection?:
        | DataSelection<RichTextRelationType<T>>
        | ((config: RichTextConfig) => DataSelection<RichTextRelationType<T>>);
      unpackSelection?:
        | DataSelection<RichTextRelationType<T>>
        | ((config: RichTextConfig) => DataSelection<RichTextRelationType<T>>);
      packSelection?:
        | DataSelection<RichTextRelationType<T>>
        | ((config: RichTextConfig) => DataSelection<RichTextRelationType<T>>);
      readonlySelection?:
        | DataSelection<RichTextRelationType<T>>
        | ((config: RichTextConfig) => DataSelection<RichTextRelationType<T>>);
    } = {}
  ): this {
    const buildSelection = (buildersKey, factory) => {
      if (typeof factory !== "function")
        return buildSelection(buildersKey, () => factory);
      this.selectionBuilders[buildersKey].push((config, { relations }) => {
        relations[typeKey] = factory(config);
      });
    };

    buildSelection("forPacking", packSelection);
    buildSelection("forUnpacking", unpackSelection);
    buildSelection("forReadonly", readonlySelection);

    Reflect.defineMetadata(
      "design:type",
      entityType,
      RichTextRelation.prototype,
      typeKey
    );
    Reflect.decorate(
      [
        ManyToOne(() => entityType, {
          // nullable: true,
          ...decoratorOptions,
        }),
      ],
      RichTextRelation.prototype,
      typeKey
    );
    return this;
  }
}

export type RichTextRelationOptions = {
  unpackSelection;
  packSelection;
  readonlySelection;
};
