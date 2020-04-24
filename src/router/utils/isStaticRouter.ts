import {isEmptyObject} from "../../common/object/isEmptyObject";
import {AnyRouter} from "../Router";

export function isStaticRouter<T extends AnyRouter>(router) {
    return isEmptyObject(router.params);
}
