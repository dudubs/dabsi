import {
    cloneElement,
    ComponentType,
    createElement,
    forwardRef,
    Fragment,
    isValidElement,
    ReactElement,
    ReactNode
} from "react";
import {Nullable} from "../../common/typings";


export type RendererLayout<T> = {
    (props: T): ReactElement;
};


export type LayoutOld<T = {}> =
    // TypeLayout<T> |
    RendererLayout<T> |
    ReactElement<T>;



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

    }
    throw new TypeError(`Invalid layout ${typeof layout}`)
}


// LayoutOld(layout, defaultType, props)
export function LayoutOld(layout: LayoutOld): ReactElement
export function LayoutOld<P>(layout: LayoutOld | undefined): ReactElement | undefined
export function LayoutOld<P>(layout: LayoutOld<P>, props: P): ReactElement
export function LayoutOld<P>(layout: LayoutOld<P> | undefined, props: P): ReactElement | undefined
export function LayoutOld<P>(layout: LayoutOld<P>, props: P): ReactElement

export function LayoutOld(layout, props = null, ...children): any {
    return _Layout(layout, props, children);
}


export namespace LayoutOld {
    export type Container<P = {}> = LayoutOld<P & { children: ReactNode }>;

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


    export type Default<P = {}> = LayoutOld<P> | { withProps: Partial<P> }

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
