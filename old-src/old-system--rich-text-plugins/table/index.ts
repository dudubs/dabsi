import mapArrayAsync from "@dabsi/common/array/mapArrayAsync";
import RichTextModule from "@dabsi/system/rich-text";
import { Module } from "@dabsi/typedi";

@Module({})
export default class RichTextTableModule {
  constructor(public rtModule: RichTextModule) {
    rtModule.defineBlock("table", {
      async pack({ columns, cells }, c) {
        return {
          columns,
          cells: await mapArrayAsync(cells, async ({ content, key }) => ({
            key,
            content: await c.packContent(content),
          })),
        };
      },
      async unpack({ columns, cells }, c) {
        return {
          columns,
          cells: await mapArrayAsync(cells, async ({ content, key }) => ({
            key,
            content: await c.unpackContent(content),
          })),
        };
      },
    });
  }
}
