import {RpcConnection} from "../Rpc";
import {InputType} from "./Input";
import {AnyInputLoader} from "./InputLoader";
import {InputViewProps} from "./InputView";


export function InputLoaderViewProps<C extends RpcConnection<AnyInputLoader>>(
    props: InputViewProps<C>):
    InputViewProps<RpcConnection<InputType<C>['LoaderInput']>> {

    return props as any
}
