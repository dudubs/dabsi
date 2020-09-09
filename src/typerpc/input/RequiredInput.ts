import {RpcConfig} from "../Rpc";
import {RpcConfigurator} from "../RpcConfigurator";
import {AnyInput, InputValue} from "./Input";
import {InputLoader} from "./InputLoader";

export type RequiredInput<T extends AnyInput> =
    RpcConfigurator<InputLoader<NonNullable<InputValue<T>>, "REQUIRED", T>,
        RpcConfig<T>>;

export function RequiredInput<T extends AnyInput>(
    target: T
): RequiredInput<T> {
    return <any>RpcConfigurator<RequiredInput<AnyInput>>(
        InputLoader<any, any>()<AnyInput>(target),
        config => {
            return {
                targetConfig: config,
                check(value) {
                    if (value == null)
                        return "REQUIRED"
                }
            }
        }
    )
}
