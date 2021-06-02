import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import { Resolver } from "@dabsi/typedi";

export function RichTextConfigResolver(
  config: Omit<RichTextConfig, "context">
): Resolver<RichTextConfig> {
  return Resolver([RichTextContext], context => {
    return { context, ...config };
  });
}
Resolver.object;
