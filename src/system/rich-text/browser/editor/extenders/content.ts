import Immutable from "immutable";
import { ContentState } from "draft-js";
import definePrototype from "@dabsi/common/class/definePrototype";

declare module "draft-js" {
  interface ContentState {
    flatMapBlocks(
      callback: (
        block: Draft.ContentBlock,
        key: string
      ) => Iterable<Draft.ContentBlock>
    ): Draft.ContentState;
  }
}

definePrototype(ContentState, {
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
});
