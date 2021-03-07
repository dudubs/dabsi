import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { Resolver } from "@dabsi/typedi";

export const RichTextConfigContext = Resolver.token<RichTextConfig>();
