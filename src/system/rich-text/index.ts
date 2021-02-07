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
import { RichTextBlock } from "@dabsi/system/rich-text/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/contentEntity";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { Module } from "@dabsi/typedi";
import "reflect-metadata";
import { ManyToOne, RelationOptions } from "typeorm";

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

  constructor(public data: DataContext) {
    this.defineBlock("unstyled", {
      pack: (_, data) => data,
      unpack: (_, data) => data,
    });
    this.defineBlockStyle("align", {
      pack(_, value) {
        switch (value) {
          case "CENTER":
          case "LEFT":
          case "RIGHT":
            return value;
        }
      },
    });
  }

  getEntityHandler<T extends RichTextEntity.Type>(
    type: T
  ): RichTextEntity.Handler<T> {
    return defined(
      this._entityHandlerMap[type],
      () => `No entity handler for "${type}".`
    );
  }

  getBlockHandler<T extends RichTextBlock.Type>(
    type: T
  ): RichTextBlock.Handler<T> {
    return defined(
      this._blockHandlerMap[type],
      () => `No block handler for "${type}".`
    );
  }

  defineBlock<T extends RichTextBlock.Type>(
    type: T,
    handler: RichTextBlock.Options<T>
  ): this {
    this._blockHandlerMap[type] = handler;
    return this;
  }

  _blockStyleHandlerMap: Record<string, any> = {};

  getBlockStyleHandler(style: string) {
    return this._blockStyleHandlerMap[style];
  }

  defineBlockStyle<T extends keyof RichTextBlock.Styles>(
    type: T,
    {
      ...handler
    }: {
      pack?(
        config: RichTextConfig,
        value: RichTextBlock.Styles[T]
      ): RichTextBlock.Styles[T];
    } = {}
  ) {
    this._blockStyleHandlerMap[type] = { ...handler };
  }

  defineEntity<T extends RichTextEntity.Type>(
    type: T,
    { ...handler }: RichTextEntity.Options<T>
  ): this {
    this._entityHandlerMap[type] = {
      ...handler,
    };
    return this;
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
