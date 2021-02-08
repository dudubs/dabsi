import mapArrayAsync from "@dabsi/common/array/mapArrayAsync";
import RichTextModule from "@dabsi/system/rich-text";

import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface BlockDataTypes {
      table: DataType<
        { rows: RichTextContent.Packed[] },
        {
          rows: RichTextContent.Unpacked[];
        },
        { columns: number }
      >;
    }
  }
}
@Module({})
export default class RichTextTableModule {
  constructor(public rtModule: RichTextModule) {
    rtModule.defineBlock("table", {
      async pack({ columns, rows }, c) {
        return {
          columns,
          rows: await mapArrayAsync(rows, content => c.packContent(content)),
        };
      },
      async unpack({ columns, rows }, c) {
        return {
          columns,
          rows: await mapArrayAsync(rows, content => c.unpackContent(content)),
        };
      },
    });
  }
}
