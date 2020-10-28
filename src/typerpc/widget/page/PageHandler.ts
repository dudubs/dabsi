import { RpcConfigHookHandler } from "../../RpcConfigHook";
import { AnyPage, Page } from "./Page";
import { AnyWidget } from "../Widget";

export const PageHandler: RpcConfigHookHandler<AnyPage> = ({ config }) => $ =>
  $({
    targetConfig: config.targetConfig,
    getElement: async () => {
      return { title: await config.getTitle() };
    },
  });
