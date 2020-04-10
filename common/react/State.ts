import {Component} from "react";
import {KeysByValue} from "../typings";

const isStateReady = Symbol('isStateReady');
const currentState = Symbol('currentState');
const immediate = Symbol('immediateState');

function getCurrentState(component) {
    return component[currentState] ?? (component[currentState] = {});
}


export const AfterMount = componentHook("componentDidMount");
export const BeforeMount = componentHook("componentWillMount");
export const AfterUnmount = componentHook("componentWillUnmount");

export function componentHook(eventProp: keyof Component) {
    return function BeforeUnmount() {
        return function (target:Component, prop) {
            // @ts-ignore
            const prev = target[eventProp];
            // @ts-ignore
            target[eventProp] = function () {
                prev?.apply(this);
                this[prop]();
            }
        }

    }
}


export const State = <K extends PropertyKey = never>(method?: K) =>
    (target: Record<K, (key: string) => void> & { componentDidMount? }, prop: string) => {
        if (typeof target[isStateReady] !== "boolean") {
            target[isStateReady] = false;
            const {componentDidMount} = target;
            target.componentDidMount = function () {
                this[isStateReady] = true;
                return componentDidMount?.apply(this);
            }

        }
        target[immediate] = undefined;
        Object.defineProperty(target, prop, {
            get() {
                return getCurrentState(this)[prop];
            },
            set(this: Component & { isDidMount }, value) {
                if (getCurrentState(this)[prop] === value)
                    return;
                getCurrentState(this)[prop] = value;
                // @ts-ignore
                method && this?.[method](prop);

                if (target[immediate] === undefined) {
                    if (this[isStateReady]) {
                        this.setState(state => {
                            target[immediate] = undefined;
                            return {...state, ...getCurrentState(this)}
                        })
                    }
                }
            }
        })
    };
