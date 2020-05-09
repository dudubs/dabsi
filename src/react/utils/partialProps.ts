import {Seq} from "immutable";
import {ComponentType, createElement, FunctionComponent} from "react";
import {PartialKeys} from "../../common/typings";

export const DefaultPropExtenderSymbol = Symbol();

export type DefaultPropExtender<T> =
    Record<typeof DefaultPropExtenderSymbol, (value: T, props) => T>;

export type DefaultProp<T> = DefaultPropExtender<T> | T;

export function DefaultProp<T>(
    extend: (value: T) => T
): DefaultPropExtender<T> {
    return {[DefaultPropExtenderSymbol]: extend}
}


export type WithDefaultProps = {

    <T>(defaultProps: T):
        <P>(component: ComponentType<P & T>) =>
            FunctionComponent<P & Partial<T>>;


    <P, K extends keyof P>(
        component: ComponentType<P>,
        defaultProps: {
            [_K in K]: DefaultProp<P[_K]>
        }
    ):
        FunctionComponent<PartialKeys<P, K>>;
};

export function _withDefaultProps(
    component, defaultProps,
    extraDefaultProps?
) {

    if (component.defaultComponent)
        return _withDefaultProps(component.defaultComponent,
            defaultProps, {
                ...extraDefaultProps,
                ...component.defaultProps,
            });


    // console.log({component});
    const func = props => {
        return createElement(component, props)
    };

    func.defaultComponent = component;

    func.displayName = component.displayName ??
        component.name;

    const _defaultPros = {...extraDefaultProps};
    for (const [prop, value] of
        Seq.Keyed(<Record<string, DefaultProp<any>>>defaultProps)) {
        const extend = value?.[DefaultPropExtenderSymbol];
        _defaultPros[prop] =
            extend ? extend(_defaultPros[prop], _defaultPros) : value;
    }

    func.defaultProps = _defaultPros;

    return func;
}

export const partialProps: WithDefaultProps =
    (componentOrProps, props?): any => {
        if (props)
            return _withDefaultProps(componentOrProps, props);
        return component => _withDefaultProps(component, componentOrProps);
    };
