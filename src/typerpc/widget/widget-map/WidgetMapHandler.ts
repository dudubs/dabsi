import { AbstractWidgetHandler } from "../ AbstractWidgetHandler";
import { mapObjectAsync } from "../../../common/object/mapObject";
import { RpcUnresolvedConfig } from "../../Rpc";
import { WidgetController, WidgetElement } from "../Widget";
import { AnyWidgetMap } from "./WidgetMap";

type T = AnyWidgetMap;

export class WidgetMapHandler extends AbstractWidgetHandler<T> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config;
  }

  async getElement(): Promise<WidgetElement<T>> {
    return {
      elementMap: await mapObjectAsync(this.rpc.targetMap, (target, key) =>
        this.controllerHandler
          .then(c => c.getTargetHandler(key))
          .then(h => h.getElement())
      ),
    };
  }
}

/*

AppUserServiceConfig =
(UserResolver:Resolver<User>) =>
RpcConfigResolver([User],(user)=>$=>$({

  PermsResolver("ALLOW_TO_ADD_COMMENT", AppPerms, "COMMENT")


}))

AppServiceConfigResolver = RpcConfigResolver([[Session]],

  AppUserServiceConfig(
    Provider()
      .for(Type|TokenResolver, xx)
      .for()
      .for()
      .
  )

],(session,appConfig)=>$=>{


})


()=> X.createRpcHandler($=>{

})

 */
