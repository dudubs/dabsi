import {Component} from "react";
import {BaseMapFactory} from "../../common/map/mapFactory";
import {SymbolMap} from "../../common/map/SymbolMap";

const didMount = Symbol('didMount');

const setStateCalled = Symbol('setStateCalled');

const getState = BaseMapFactory(
    SymbolMap("currentState"),
    (): any => ({})
);


export const State = <K extends PropertyKey = never>(method?: K) =>
    (target: Record<K, (key: string) => void> & { componentDidMount? }, prop: string) => {
        // is first time to use @State decorator
        if (typeof target[didMount] !== "boolean") {
            target[didMount] = false;
            const {componentDidMount} = target;
            target.componentDidMount = function () {
                this[didMount] = true;
                return componentDidMount?.apply(this);
            }
        }

        target[setStateCalled] = false;
        Object.defineProperty(target, prop, {
            get() {
                return getState(this)[prop];
            },
            set(this: Component, value) {
                if (getState(this)[prop] === value)
                    return;
                getState(this)[prop] = value;
                // @ts-ignore
                method && this?.[method](prop);

                if (this[didMount] && !this[setStateCalled]) {
                    this.setState(state => {
                        this[setStateCalled] = false;
                        return {...state, ...getState(this)}
                    })
                }
            }
        })
    };
