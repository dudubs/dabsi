import {Component, Context, createElement, ReactNode} from "react";
import {assert} from "../../common/assert";
import {mapFactory} from "../../common/map/mapFactory";
import {Lazy} from "../../common/patterns/lazy";
import {ContextOrType} from "../utils/ContextOrType";

export const getViewMetadataBuilders = mapFactory(new WeakMap(), () =>
    Array<(metadata: ViewMetadata) => void>());

export class ViewMetadata {

    renderProperties = new Set<string>();

    renderMethods = new Set<string>();

    mountMethods = new Set<string>();

    unmountMethods = new Set<string>();

    contexts = new Map<string, Context<any>>();


}


export const getViewMetadata = mapFactory(new WeakMap(), (view: View<any>): ViewMetadata => {
    const metadata = new ViewMetadata();
    for (; view !== View.prototype; view = Object.getPrototypeOf(view)) {
        for (const builder of getViewMetadataBuilders(view)) {
            builder(metadata);
        }
    }
    return metadata;
});

export function ViewState<Method extends PropertyKey>(method?: Method) {
    return function (target: View<any>, key: string) {

        Object.defineProperty(target, key, {
            get(this: View) {
                return this.currentState[key];
            },
            set(this: View & Record<Method, () => void>, value) {
                if (this.currentState[key] === value)
                    return;
                this.currentState[key] = value;
                method && this[method]();

                if (this.didMount && !this.didSetState) {
                    this.setState(state => {
                        this.didSetState = true;
                        return {...state, ...this.currentState}
                    })
                }
            }
        })
    }
}

export type ForwardContextOrType<T> = ContextOrType<T> | (() => ContextOrType<T>);

export function ViewContext<T>(
    contextOrType: ForwardContextOrType<T>
) {
    return function <K extends string>(target: View<any> & Record<K, T>, key: K) {
        getViewMetadataBuilders(target).push(metadata => {
            const isForward = ((typeof contextOrType === "function") && !contextOrType.prototype);
            metadata.contexts.set(key, ContextOrType(
                isForward ? (<() => ContextOrType<any>>contextOrType)() :
                    contextOrType
            ));
        })
    }
}


export function OnRenderView() {
    return function (target: View<any>, key: string, desc: PropertyDescriptor) {
        assert(typeof (desc.get || desc.value) === "function");

        getViewMetadataBuilders(target).push(metadata => {
            if (desc.get) {
                Lazy()(target, key, desc);
                metadata.renderProperties.add(key);
            } else {
                metadata.renderMethods.add(key);
            }
        })
    }
}


export function OnMountView(): MethodDecorator {
    return function (target, method, desc) {
        assert(typeof desc.value === "function");
        assert(typeof method === "string");
        getViewMetadataBuilders(target).push(metadata => {
            metadata.mountMethods.add(method);
        })
    }
}


export function OnUnmountView(): MethodDecorator {
    return function (target, method, desc) {
        assert(typeof desc.value === "function");
        assert(typeof method === "string");
        getViewMetadataBuilders(target).push(metadata => {
            metadata.unmountMethods.add(method);
        })
    }
}


export abstract class View<P = {}> extends Component<P, any> {

    // @BeforeRender

    abstract renderView(): ReactNode;

    didMount = false;

    willUnmount = false;

     currentState = {};

    didSetState = false;

    metadata: ViewMetadata =
        getViewMetadata(Object.getPrototypeOf(this));

    componentDidMount() {
        this.didMount = true;
        for (let method of this.metadata.mountMethods) {
            this[method]();
        }
    }

    componentWillUnmount() {
        this.willUnmount = true;
        for (let method of this.metadata.unmountMethods) {
            this[method]();
        }
    }

    render() {
        for (const key of this.metadata.renderProperties) {
            Lazy.delete(this, key);
        }
        for (const method of this.metadata.renderMethods) {
            this[method]();
        }
        let children = this.renderView();
        for (let [key, {Consumer}] of this.metadata.contexts.entries()) {
            const prevChildren = children;
            children = createElement(Consumer, {
                children: value => {
                    this[key] = value;
                    return prevChildren;
                }
            })
        }
        return children;
    }
}
