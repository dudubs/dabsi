import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { Type } from "@dabsi/common/typings2/Type";
import {
  RichTextEntityData,
  RichTextEntityType,
} from "@dabsi/system/rich-text/common/RichText";
import { DataSelection } from "@dabsi/typedata/data-selection/DataSelection";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataRow } from "@dabsi/typedata/DataRow";

export type RichTextEntitySelection<
  K extends RichTextEntityType
> = DataSelection<IRichText.EntityChildren[K]>;

export type RichTextEntityRow<
  K extends RichTextEntityType,
  S extends RichTextEntitySelection<K>
> = DataRow<
  DataSelectionRow<IRichText.EntityChildren[K], Override<{ pick: [] }, S>>
>;

export type RichTextEntityHandler<
  K extends RichTextEntityType = any
> = _OptionsAndHandler<K> & {
  packSelection: RichTextEntitySelection<K>;

  unpackSelection: RichTextEntitySelection<K>;

  removeSelection: RichTextEntitySelection<K>;

  readonlySelection: RichTextEntitySelection<K>;

  pack(
    row,
    unpackedData: RichTextEntityData<K>["unpacked"]
  ): RichTextEntityData<K>["packed"];
  unpack(
    row,
    packedData: RichTextEntityData<K>["packed"]
  ): RichTextEntityData<K>["unpacked"];
  readonlyUnpack(
    row,
    packedData: RichTextEntityData<K>["unpacked"]
  ): RichTextEntityData<K>["readonly"];
};

export type _OptionsAndHandler<K extends RichTextEntityType> = {
  entityType: Type<IRichText.EntityChildren[K]>;

  mutability: { [K in Draft.DraftEntityMutability]?: boolean };

  packEntityRowKey(unpackedData: RichTextEntityData<K>["unpacked"]): string;
};

export type RichTextEntityHandlerOptions<
  K extends RichTextEntityType,
  Selection extends RichTextEntitySelection<K> = {},
  //
  PackSelection extends RichTextEntitySelection<K> = Selection,
  UnpackSelection extends RichTextEntitySelection<K> = Selection,
  //
  RemoveSelection extends RichTextEntitySelection<K> = UnpackSelection,
  //
  ReadonlySelection extends RichTextEntitySelection<K> = UnpackSelection
> = _OptionsAndHandler<K> & {
  selection?: Selection;

  packSelection?: PackSelection;

  unpackSelection?: UnpackSelection;

  removeSelection?: RemoveSelection;

  readonlySelection?: ReadonlySelection;

  pack?: (
    row: RichTextEntityRow<K, PackSelection>,
    unpackedData: RichTextEntityData<K>["unpacked"]
  ) => Awaitable<RichTextEntityData<K>["packed"]>;

  unpack?: (
    row: RichTextEntityRow<K, UnpackSelection>,
    packedData: RichTextEntityData<K>["packed"]
  ) => RichTextEntityData<K>["unpacked"];

  readonlyUnpack?: (
    row: RichTextEntityRow<K, ReadonlySelection>,
    packedData: RichTextEntityData<K>["packed"]
  ) => RichTextEntityData<K>["readonly"];
};

export function RichTextEntityHandler({
  selection,
  packSelection = selection,
  unpackSelection = selection,
  readonlySelection = unpackSelection,
  removeSelection = unpackSelection,
  pack = () => null,
  unpack = () => null,
  readonlyUnpack = unpack,
  ...options
}: RichTextEntityHandlerOptions<
  any,
  any,
  any,
  any
>): RichTextEntityHandler<any> {
  return {
    ...options,
    unpackSelection: { pick: [], ...unpackSelection },
    packSelection: { pick: [], ...packSelection },
    readonlySelection: { pick: [], ...readonlySelection },
    removeSelection: { pick: [], ...removeSelection },
    pack,
    unpack,
    readonlyUnpack,
  };
}
