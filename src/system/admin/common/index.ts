import { Router } from "../../../typerouter/Router";
import { RpcMap } from "../../../typerpc/rpc-map/RpcMap";
import { SystemRouter } from "../../core/common/SystemRouter";

export const AdminRouter = Router();

SystemRouter.register("admin", AdminRouter);
