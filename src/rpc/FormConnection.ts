import {FormCheckResult, FormConnectionFields, FormData, FormElement, FormRpc, FormSubmitResult, TForm} from "./Form";
import {RpcHandlerType} from "./Rpc";

export class FormConnection<T extends TForm> {
    constructor(
        public handler: RpcHandlerType<FormRpc<T>>,
        public fields: FormConnectionFields<T>,
    ) {

    }

    submit(data: FormData<T>): Promise<FormSubmitResult<T>> {
        return this.handler(["submit", {data}])
    }

    check(data: FormData<T>): Promise<FormCheckResult<T>> {
        return this.handler(["check", {data}])
    }

    getElement(): Promise<FormElement<T>> {
        return this.handler("getElement")
    }
}
