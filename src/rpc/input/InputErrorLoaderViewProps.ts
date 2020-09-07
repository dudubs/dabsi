import {RpcConnection} from "../Rpc";
import {InputType} from "./Input";
import {AnyInputErrorLoader} from "./InputLoader";
import {InputViewProps} from "./InputView";

export function InputErrorLoaderViewProps<C extends RpcConnection<AnyInputErrorLoader>>(
    props: InputViewProps<C>): InputViewProps<RpcConnection<InputType<C>['LoaderInput']>> {

    return props as any
}
