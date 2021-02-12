import Immutable from "immutable";
import extend from "@dabsi/common/function/extend";
import { ContentState } from "draft-js";

declare module "draft-js" {
  interface ContentState extends _Extra {}
}

export class _Extra extends extend(ContentState, {
  flatMapBlocks(
    callback: (
      block: Draft.ContentBlock,
      key: string
    ) => Iterable<Draft.ContentBlock>
  ): Draft.ContentState {
    return <any>(
      this.update("blockMap", blockMap =>
        blockMap.flatMap((block, key) =>
          Immutable.Seq.Indexed(
            callback(block, key)
          ).map((block: Draft.ContentBlock) => [block!.getKey(), block])
        )
      )
    );
  },
}) {}
