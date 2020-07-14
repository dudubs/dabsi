import {Field} from "./Field";
import {FieldDecorator} from "./FieldDecorator";

export type FieldConfigurator<U extends any[], C> =
    <T>(
        getDecorator: (...args: U) => (field: Field) => void
    ) => ((...args: U) => FieldDecorator<T>) & {
        get(field: Field): C | undefined;
    };

export function FieldConfigurator<T>(): FieldConfigurator<[T], T>
export function FieldConfigurator<U extends any[], T = U[0]>(
    getConfig: (...args: U) => T
): FieldConfigurator<U, T>
export function FieldConfigurator(
    getConfig?
): FieldConfigurator<any, any> {
    return (
        configure: (config) => (field: Field) => void
    ) => {
        const fieldToConfig = new WeakMap<Field, any>();

        Configurator.get = field => fieldToConfig.get(field);

        return Configurator;

        function Configurator(...args) {
            const config = getConfig ?
                getConfig.apply(this, args) : args[0];
            return FieldDecorator(field => {
                fieldToConfig.set(field, config);
                configure(config)(field);
            })
        }
    }
}
