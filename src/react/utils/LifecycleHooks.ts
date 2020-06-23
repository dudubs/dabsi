import {Component} from "react";
import {Lazy} from "../../common/patterns/lazy";
import {ExtractKeys} from "../../common/typings";

export interface LifecycleHook {
    (): {
        <K extends PropertyKey>(target: Component<any, any>, key:K, desc: PropertyDescriptor): void
    }
}



export const AfterMount = LifecycleHook("componentDidMount");

export const BeforeUnmount = LifecycleHook("componentWillUnmount");

export const BeforeRender = LifecycleHook("render");

export function LifecycleHook(
    method: string & ExtractKeys<Required<Component<any, any>>, Function>
): LifecycleHook {


    return () => {
        return (target: any, key:any, desc: PropertyDescriptor) => {
            const prev = target[method];
            if(desc.get) {
                Lazy()(target,key,desc);
            }
            target[method] = function (...args) {
                if(desc.get) {
                    this[key] = desc.get.apply(this);
                }else{
                    this[key]();
                }
                return prev?.apply(this, ...args)
            }
        }
    }
}
