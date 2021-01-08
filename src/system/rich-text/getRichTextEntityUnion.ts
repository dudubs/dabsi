import Lazy from "@dabsi/common/patterns/lazy";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { PickByValue } from "@dabsi/common/typings2/PickByValue";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/Entity";
import { DataSelection } from "@dabsi/typedata/data-selection/DataSelection";
import {
  DataUnion,
  DataUnionChild,
  DataUnionChildMap,
  DataUnionClass,
  DataUnionRelationMap,
} from "@dabsi/typedata/DataUnion";

declare global {
  interface RichTextEntityChildren {}
  interface RichTextEntityRelations {}
}

export const RichTextEntityChildren: RichTextEntityChildren = <any>{};
export const RichTextEntitySelection: DataSelection<RichTextEntityUnion> = {};
export const RichTextEntityRelations: RichTextEntityRelations = <never>{};

export type RichTextEntityUnionClass = DataUnionClass<
  RichTextEntity,
  // {
  //   [K in keyof RichTextEntityChildren]: Extract<
  //     RichTextEntityChildren[K],
  //     DataUnionChild<RichTextEntity>
  //   >;
  // },
  PickByValue<RichTextEntityChildren, DataUnionChild<RichTextEntity>>,
  {}
>;

export type RichTextEntityUnion = InstanceType<RichTextEntityUnionClass>;

export default Lazy(
  (): RichTextEntityUnionClass => {
    return <any>DataUnion(RichTextEntity, {
      children: <any>RichTextEntityChildren,
    });
  }
);
