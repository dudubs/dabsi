import {UndefinedArgs, UndefinedObject} from "../../common/typings";
import {AnyRouter} from "../Router";
import {createLocation} from "./createLocation";
import {RouterLocation, RouterLocationProps} from "./RouterLocation";

export function createRouterLocation<T extends AnyRouter>(
    router: T,
    ...[props]: UndefinedArgs<UndefinedObject<RouterLocationProps<T>>>
): RouterLocation<T> {

    return createLocation({
        parent: undefined,
        router,
        params: (<RouterLocationProps<T>>props)?.params,
        instance: (<RouterLocationProps<T>>props)?.instance,
    });
}
