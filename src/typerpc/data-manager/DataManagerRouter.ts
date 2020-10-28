import { WithMetaType } from "../../common/MetaType";
import { mapObject } from "../../common/object/mapObject";
import { Router, TEmptyRouter } from "../../typerouter/Router";
import { DataManager, TDataManager } from "./DataManager";

export type TDataManagerRouter<T extends TDataManager> = WithMetaType<{
  TDataManager: T;
}> &
  TEmptyRouter.WithChildren<{
    add: TEmptyRouter;
    edit: TEmptyRouter.WithParams<
      "id",
      {
        [K in keyof T["EditTabs"]]: TEmptyRouter;
      }
    >;
  }>;

export function DataManagerRouter<T extends TDataManager>(
  dm: DataManager<T>
): Router<TDataManagerRouter<T>> {
  return <any>(<Router<TDataManagerRouter<TDataManager>>>Router({
    add: Router(),
    edit: Router(
      ["id"],
      mapObject(dm.dataManager.editTabs, () => Router())
    ),
  }));
}
