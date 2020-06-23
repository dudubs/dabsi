import {Component, Context, createElement, ReactNode} from "react";
import {assert} from "../../common/assert";
import {Waiter} from "../../common/async/Waiter";
import {WeakMapFactory} from "../../common/map/mapFactory";
import {Lazy} from "../../common/patterns/lazy";
import {ContextOrType} from "../utils/ContextOrType";

export const getViewMetadataBuilders = WeakMapFactory(() =>
    Array<(metadata: ViewMetadata) => void>());

export class ViewMetadata {

    renderProperties = new Set<string>();

    renderMethods = new Set<string>();

    mountMethods = new Set<string>();

    unmountMethods = new Set<string>();

    updateMethods = new Set<string>();

    contexts = new Map<string, Context<any>>();


}


export const getViewMetadata = WeakMapFactory((view: View<any>): ViewMetadata => {
    const metadata = new ViewMetadata();
    for (; view !== View.prototype; view = Object.getPrototypeOf(view)) {
        for (const builder of getViewMetadataBuilders(view)) {
            builder(metadata);
        }
    }
    return metadata;
});

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


export function BeforeRenderView() {
    return function (target: View<any>, key: string, desc: PropertyDescriptor) {
        assert(typeof (desc.get || desc.value) === "function");

        desc.get && Lazy()(target, key, desc);

        getViewMetadataBuilders(target).push(metadata => {
            if (desc.get) {
                metadata.renderProperties.add(key);
            } else {
                metadata.renderMethods.add(key);
            }
        })
    }
}


export function AfterMountView(): MethodDecorator {
    return function (target, method, desc) {
        assert(typeof desc.value === "function");
        assert(typeof method === "string");
        getViewMetadataBuilders(target).push(metadata => {
            metadata.mountMethods.add(method);
        })
    }
}


export function AfterUpdateView(): MethodDecorator {
    return function (target, method, desc) {
        assert(typeof desc.value === "function");
        assert(typeof method === "string");
        getViewMetadataBuilders(target).push(metadata => {
            metadata.updateMethods.add(method);
        })
    }
}


export function BeforeMountView(): MethodDecorator {
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


    private _updateWaiters: Waiter<void>[] = [];

    async waitForUpdate<T>(getter: (view: this) => T | undefined, times = 3): Promise<T> {

        for (let index = 0; times > index; index++) {
            const value = getter(this);
            if (typeof value !== "undefined")
                return value;
            const waiter = Waiter<void>();
            this._updateWaiters.push(waiter);
            await waiter;
        }
        throw new Error(`No updates.`)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<any>, snapshot?: any) {
        for (let method of this.metadata.updateMethods) {
            this['method']();
        }
        if (this._updateWaiters.length) {
            const waiters = this._updateWaiters;
            this._updateWaiters = [];
            for (let waiter of waiters) {
                waiter.resolve();
            }
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
