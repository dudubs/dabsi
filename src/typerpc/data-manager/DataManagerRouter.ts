import { mapObject } from "../../common/object/mapObject";
import {
  Router,
  RouterType,
  RouterWithChildren,
  RouterWithParams,
} from "../../typerouter2/Router";
import {
  AnyDataManager,
  DataManagerType,
  DataManagerTypes,
  TDataManager,
} from "./DataManager";

export type AnyDataManagerRouter = DataManagerRouter<TDataManager>;

export type DataManagerRouter<T extends TDataManager> = RouterWithChildren<
  {
    add: Router;
    edit: RouterWithParams<
      "id",
      Record<keyof DataManagerTypes<T>["EditTabsWithForm"], Router>
    >;
  },
  { TDataManager: T }
>;

export function DataManagerRouter<T extends AnyDataManager>(
  dm: T
): DataManagerRouter<DataManagerType<T>> {
  const r = Router({
    add: Router(),
    edit: Router(["id"], {
      ...(mapObject(dm.editTabs, () => Router()) as Record<
        keyof DataManagerType<T>["EditTabs"],
        Router
      >),
      form: Router(),
    }),
  });
  return r as Router<
    RouterType<typeof r> & {
      TDataManager: DataManagerType<T>;
    }
  >;
}
