import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { touchSet } from "@dabsi/common/map/touchSet";
import { entries } from "@dabsi/common/object/entries";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextConfig } from "@dabsi/system/rich-text/common/RichText";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { RichTextEntityHandler } from "@dabsi/system/rich-text/RichTextEntityHandler";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataUnion } from "@dabsi/typedata/DataUnion";

export interface RichTextInputValue {
  config: RichTextConfig;

  getContent(): Awaitable<null | Draft.RawDraftContentState>;
}
