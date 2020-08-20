import {FormFieldProps, FormFieldRpc, TFormField} from "./FormField";
import {RpcConnectionType, RpcHandlerType} from "./Rpc";

export class FormFieldConnection<T extends TFormField> {

    constructor(
        public props: FormFieldProps<T>,
        public handler: RpcHandlerType<FormFieldRpc<T>>
    ) {
    }

    remote: RpcConnectionType<T['Remote']> = this.props.remote.connect(payload => {
        return this.handler(["remote", payload])
    })

    check(data: T['Data']): Promise<T['Error'] | undefined> {
        return this.handler(["check", {data}])
    }

    getElement(): Promise<T['Element']> {
        return this.handler("getElement")
    }

}
