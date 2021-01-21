import { Expect } from "@dabsi/common/typings2/Expect";

declare global {
  namespace IRichText {
    interface ConfigAndElement {}

    interface Config extends ConfigAndElement {}

    interface Element extends ConfigAndElement {}

    interface EntityChildren {}

    interface EntityDataTypes {}

    interface BlockDataTypes {
      atomic;
      unstyled;
      header: {
        packed: 1 | 2 | 3 | 4 | 5 | 6;
        unpacked: { level: number };
        readonly: { level: number };
      };
    }
  }
}

export type RichTextConfig = IRichText.Config;

export type RichTextElement = IRichText.Element;

export type RichTextBlockType = keyof IRichText.BlockDataTypes;

export type RichTextEntityType =
  | keyof IRichText.EntityDataTypes
  | keyof IRichText.EntityChildren;

type _ = [
  // Entity *
  Expect<keyof IRichText.EntityChildren, RichTextEntityType>,
  Expect<keyof IRichText.EntityDataTypes, RichTextEntityType>,
  Expect<
    {
      [K in keyof IRichText.EntityDataTypes]: {
        packed: any;

        unpacked: object;

        readonly: object;
      };
    },
    IRichText.EntityDataTypes
  >,
  // Block *
  Expect<
    {
      [K in keyof IRichText.BlockDataTypes]: {
        packed: any;

        unpacked: object;

        readonly: object;
      };
    },
    IRichText.BlockDataTypes
  >
];

export type RichTextEntityData<
  K extends RichTextEntityType
> = IRichText.EntityDataTypes[K];

export type RichTextBlockData<
  K extends RichTextBlockType
> = IRichText.BlockDataTypes[K];
