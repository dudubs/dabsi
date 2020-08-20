import {FormField, FormFieldHandlerTypes, FormFieldProps, FormFieldRpc, TFormField} from "./FormField";
import {FormFieldConnection} from "./FormFieldConnection";
import {MappedRpcHandlerFn} from "./MappedRpcHandlerFn";
import {RpcHandlerType} from "./Rpc";

export class InternalFormField<T extends TFormField> implements FormFieldRpc<T> {
    constructor(
        public props: FormFieldProps<T>
    ) {
        if (props.remote && !props.getRemoteConfig)
            throw new Error('No getRemoteConfig.')
    }

    async getElement(config: T['Config']): Promise<T['Element']> {
        return this.props.getElement?.(config)
    }

    async loadValue(config: T['Config'], data: T['Data']): Promise<T['Value']> {
        return this.props.load ?
            await this.props.load(config, data) :
            data;
    }

    async checkValue(config: T['Config'], value: T['Value']): Promise<T['Error']> {
        return this.props.check?.(config, value)
    }

    handle: FormFieldRpc<T>['handle'];

    connect(handler: RpcHandlerType<FormFieldRpc<T>>): FormFieldConnection<T> {
        return new FormFieldConnection(this.props, handler);
    }
}


InternalFormField.prototype.handle = MappedRpcHandlerFn<FormField<any>, FormFieldHandlerTypes<any>>({
    async check(config, payload) {
        return this.checkValue(config,
            await this.loadValue(config, payload.data))
    },
    remote(config, payload) {
        return this.props.remote.handle(
            this.props.getRemoteConfig(config)
        )(payload.payload);
    },
    getElement(config) {
        return this.getElement(config)
    }
});
