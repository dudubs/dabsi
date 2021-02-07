import { Expect } from "@dabsi/common/typings2/Expect";

declare global {
  namespace IRichText {
    interface ConfigAndElement {}

    interface Config extends ConfigAndElement {}

    interface Element extends ConfigAndElement {}

    interface RelationTypes {}
  }
}
export type RichTextRelationType<
  K extends RichTextRelationTypeKey
> = IRichText.RelationTypes[K];

export type RichTextConfig = IRichText.Config;

export type RichTextElement = IRichText.Element;

export type RichTextRelationTypeKey = keyof IRichText.RelationTypes;

type _ = [
  Expect<
    {
      [K in keyof IRichText.EntityDataTypes]: {
        packed: any;

        unpacked: object;
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
      };
    },
    IRichText.BlockDataTypes
  >
];
