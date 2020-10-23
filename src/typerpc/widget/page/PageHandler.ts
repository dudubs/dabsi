import { RpcConfigHookHandler } from "../../RpcConfigHook";
import { Page } from "./Page";
import { AnyWidget } from "../Widget";

export const PageHandler: RpcConfigHookHandler<Page<AnyWidget>> = config => $ =>
  $({
    targetConfig: config.targetConfig,
    getElement: async () => {
      return { title: await config.getTitle() };
    },
  });
