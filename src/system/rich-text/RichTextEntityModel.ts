import { Expect } from "@dabsi/common/typings2/Expect";
import { Union } from "@dabsi/common/typings2/Union";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { DataUnion } from "@dabsi/typedata/DataUnion";

declare global {
  namespace IRichText {
    interface EntityChildren {}
  }
}
export type RichTextEntityUnion = DataUnion<
  RichTextEntity,
  IRichText.EntityChildren,
  {}
>;

type _ = [
  Expect<
    {
      [K in keyof IRichText.EntityChildren]: RichTextEntity;
    },
    IRichText.EntityChildren
  >
];
