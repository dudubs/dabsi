import {cloneElement, ComponentType, createElement, Fragment, isValidElement, ReactElement, ReactNode} from "react";
import {Nullable} from "../typings";


export type RendererLayout<T> = {
    (props: T): ReactElement;
};

export type NoPropsLayout = { noProps: ComponentType };
export type TypeLayout<T> = { type: ComponentType<T> };


export type Layout<T = {}> =
    TypeLayout<T> |
    NoPropsLayout |
    RendererLayout<T> |
    ReactElement<T> |
    string |
    symbol;


function isNoPropsLayout(layout: object & Layout): layout is NoPropsLayout {
    return 'noProps' in layout
}

function isTypeLayout(layout: object & Layout): layout is TypeLayout<any> {
    return 'type' in layout
}

function _Layout(layout, props, children: any = []): ReactElement {
    if (!Array.isArray(children)) {
        children = [children];
    }


    switch (typeof layout) {
        case "undefined":
            return createElement(Fragment)
        case "string":
        case "symbol":
        case "function":
            return layout(
                children?.length ? {...props, children} :
                    props
            );
        case "object":
            if (isValidElement(layout))
                return cloneElement(layout, props, ...children);
            if (isNoPropsLayout(layout)) {
                return createElement(layout.noProps);
            }
            if (isTypeLayout(layout))
                return createElement(layout.type, props, ...children);
    }
    throw new TypeError(`Invalid layout ${typeof layout}`)
}


// Layout(layout, defaultType, props)
export function Layout(layout: Layout): ReactElement
export function Layout<P>(layout: Layout | undefined): ReactElement | undefined
export function Layout<P>(layout: Layout<P>, props: P): ReactElement
export function Layout<P>(layout: Layout<P> | undefined, props: P): ReactElement | undefined
export function Layout<P>(layout: Layout<P>, props: P): ReactElement

export function Layout(layout, props = null, ...children): any {
    return _Layout(layout, props, children);
}


export namespace Layout {
    export type Container<P = {}> = Layout<P & { children: ReactNode }>;

    export type ContainerElement = ReactNode[] | ReactElement;

    export function Container(layout: Container | Nullable, element: ContainerElement)
    export function Container<P>(layout: Container<P> | Nullable, props: P, element: ContainerElement)
    export function Container(layout, props, element?) {
        if (!layout)
            layout = Fragment;

        if (!element) {
            element = props;
            props = null;
        }

        if (Array.isArray(element)) {
            return _Layout(layout, props, element)
        }

        if (isValidElement(element)) {
            return _Layout(layout, props, [element])
        }

        if (element.type === Fragment) {
            return _Layout(layout, props, element.props.children)
        }

        throw new TypeError('Container element must to be fragment.');
    }


    export type Default<P = {}> = Layout<P> | { withProps: Partial<P> }

    export function Default(
        layout: Default | Nullable,
        type: ComponentType,
    )
    export function Default<P>(
        layout: Default<P> | Nullable,
        type: ComponentType<P>,
        props: P,
        ...children
    )
    export function Default<P>(
        layout,
        type,
        props?,
        ...children
    ) {
        if (layout === undefined)
            return _Layout({type}, props, children);
        if ((typeof layout === "object") && ('withProps' in layout)) {
            return _Layout({type}, layout.withProps, children)
        }
        return _Layout(layout, props, children)
    }
}
