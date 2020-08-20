import {entries} from "../common/object/entries";
import {hasKeys} from "../common/object/hasKeys";
import {mapObject} from "../common/object/mapObject";
import {FormData, FormHandlerTypes, FormRpc, TForm} from "./Form";
import {FormConnection} from "./FormConnection";
import {MappedRpcHandlerFn} from "./MappedRpcHandlerFn";
import {RpcConnectionType, RpcHandlerType} from "./Rpc";


export class InternalForm<T extends TForm> implements FormRpc<T> {

    constructor(
        public fields: T['Fields']
    ) {
    }

    connect(handler: RpcHandlerType<FormRpc<T>>): RpcConnectionType<FormRpc<T>> {
        return new FormConnection(handler,
            <any>mapObject(this.fields, (field, name) => {
                return field.connect(payload => {
                    return handler(["remote", [name,payload]])
                })
            }))
    }

    handle: FormRpc<T>['handle'];

    async loadAndCheck(config: RpcConnectionType<FormRpc<T>>, data: FormData<T>) {
        const errors: any = {};
        const values: any = {};
        for (const [key, field] of entries(this.fields)) {

            const value = values[key] =
                await field.loadValue(config.fields[key], data[key]);
            const error =
                await field.checkValue(config.fields[key], value);
            if (error != null)
                errors[key] = error;
        }
        return {errors, values}
    }
}


InternalForm.prototype.handle = MappedRpcHandlerFn<InternalForm<any>, FormHandlerTypes<any>>({

    async getElement(config) {
        const element: any = {};
        for (const [key, field] of entries(this.fields)) {
            element[key] = await field.getElement(config[key]);
        }
        return element;
    },

    remote(config, [name,payload]) {
        return this.fields[name]
            .handle(config.fields[name])
            (payload);
    },

    async check(config, payload) {
        const loadMap = await this.loadAndCheck(config, payload.data);
        if (hasKeys(loadMap.errors))
            return {type: "invalid", error: loadMap.errors}
        return {type: "valid"};
    },

    async submit(config, payload) {
        const loadMap = await this.loadAndCheck(config, payload.data);
        if (hasKeys(loadMap.errors))
            return {type: "invalid", error: loadMap.errors};
        return {
            type: "result",
            value: await config.submit?.(loadMap.values)
        }
    },

})
