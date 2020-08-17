import {Component, ComponentType, createElement, Fragment, ReactElement, ReactNode} from "react";
import {Waiter} from "../common/async/Waiter";
import {RandomId} from "../common/patterns/RandomId";
import {ImmutableMap} from "../immutable2";
import {createUndefinedContext} from "./utils/hooks/createUndefinedContext";
import {useDefinedContext} from "./utils/hooks/useDefinedContext";
import {State} from "./utils/State";


export class ModalStackItem<T = any> {
    constructor(
        public component: ComponentType,
        public key: string,
        public pop: () => void,
        public resolve: (value: T) => void
    ) {
    }


}

export const ModalStackContext =
    createUndefinedContext<ModalStack>();

export const ModalStackItemContext =
    createUndefinedContext<ModalStackItem>();


/*
    ComponentStack.push(()=>{
        ....
    })
 */

export class ModalStack extends Component<{ children?: ReactNode }> {

    @State() items = ImmutableMap<string, ModalStackItem>();


    render() {
        return createElement(ModalStackContext.Provider, {
            value: this,
            children: createElement(Fragment, null, [
                this.items.map(item =>
                    createElement(Fragment, {
                        key: item.key,
                        children: createElement(ModalStackItemContext.Provider, {
                            value: item,
                            children: createElement(item.component)
                        })
                    })
                ).toIndexedSeq().toArray(),
                this.props.children
            ])
        })
    }

    promise<T>(
        render: (callback: (value: T) => void) => ReactElement
    ): Promise<T> {
        return new Promise<T>(resolve => {
            const key = RandomId();
            this.items = this.items.set(key, new ModalStackItem<T>(
                () => render(value => {
                    resolve(value);
                    this.items = this.items.delete(key);
                }),
                key,
                () => {
                    this.pop(key)
                },
                value => {
                    resolve(value)
                }
            ));
        })
    }


    // TODO: return
    pick<T>(
        component: ComponentType<PickerProps<T>>,
    ): Promise<T|undefined> {
        return new Promise<T|undefined>(resolve => {
            const key = RandomId();
            this.items = this.items.set(key, new ModalStackItem<T>(
                () => createElement(component, {
                    onPick: value => {
                        resolve(value);
                        this.items = this.items.delete(key);
                    }
                }),
                key,
                () => {
                    this.pop(key)
                    resolve();
                },
                value => {
                    resolve(value)
                }
            ));
        })
    }

    push<T>(render: (
        pop: () => void
    ) => ReactElement): { pop(result?: T) } & PromiseLike<T> {
        const key = RandomId();
        const waiter = Waiter();
        const pop = () => this.pop(key);
        this.items = this.items.set(key, new ModalStackItem(
            () => render(pop),
            key,
            () => this.pop(key),
            value => {
                waiter.resolve(value);
                this.pop(key);
            }
        ));
        return {
            pop,
            then: waiter.then.bind(waiter)
        }

    }

    pop(key: string) {
        this.items = this.items.delete(key);
    }
}


export type PickerProps<T> = { onPick?(value: T) :void};

export function useModalStack() {
    return useDefinedContext(ModalStackContext);
}
