import { defined } from "@dabsi/common/object/defined";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { Hookable } from "@dabsi/modules/Hookable";
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
import { RichTextBlock } from "@dabsi/system/rich-text/common/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { Module } from "@dabsi/typedi";
import "reflect-metadata";
import { ManyToOne, RelationOptions } from "typeorm";
import { initRichTextModule } from "@dabsi/system/rich-text/init";
import { AnyRpc, RpcError } from "@dabsi/typerpc/Rpc";

@Module({
  dependencies: [DbModule],
})
export default class RichTextModule {
  styleTypes = new Set<string>();

  buildInputElement = Hookable<
    (config: RichTextConfig, element: RichTextElement) => Awaitable
  >();

  buildElement = Hookable<
    (config: RichTextInputConfig, element: RichTextInputElement) => Awaitable
  >();

  protected _blockHandlerMap: Record<string, RichTextBlock.Handler<any>> = {};
  protected _entityHandlerMap: Record<string, RichTextEntity.Handler<any>> = {};
  protected _allowedRpcForReadonly = new Set<AnyRpc>();
  protected _blockStyleHandlerMap: Record<
    string,
    RichTextBlock.StyleHandler<any>
  > = {};

  constructor(public data: DataContext) {
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
    { unpack = data => data, ...handler }: RichTextBlock.Options<T>
  ): this {
    this._blockHandlerMap[type] = { ...handler, unpack };
    return this;
  }

  getBlockHandler<T extends RichTextBlock.Type>(
    type: T
  ): RichTextBlock.Handler<T> {
    return defined(
      this._blockHandlerMap[type],
      () => `No block handler for "${type}".`
    );
  }

  defineBlockStyle<T extends RichTextBlock.StyleType>(
    type: T,
    { ...handler }: RichTextBlock.StyleHandler<T>
  ): this {
    this._blockStyleHandlerMap[type] = { ...handler };
    return this;
  }

  getBlockStyleHandler<T extends RichTextBlock.StyleType>(
    type: T
  ): RichTextBlock.StyleHandler<T> {
    return defined(
      this._blockStyleHandlerMap[type],
      () => `No style handle for "${type}".`
    );
  }

  defineEntity<T extends RichTextEntity.Type>(
    type: T,
    { ...handler }: RichTextEntity.Options<T>
  ): this {
    this._entityHandlerMap[type] = {
      type,
      ...handler,
    };
    return this;
  }

  getEntityHandler<T extends RichTextEntity.Type>(
    type: T
  ): RichTextEntity.Handler<T> {
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
