import {Component, createContext, createElement, Fragment, ReactNode} from "react";
import {Waiter} from "../common/async/Waiter";
import {RandomId} from "../common/patterns/RandomId";
import {ImmutableMap} from "../immutable";
import {useDefinedContext} from "./utils/hooks/useDefinedContext";
import {Layout} from "./utils/Layout";
import {State} from "./utils/State";


export class ModalStackItem {
    constructor(
        public layout: Layout,
        public key: string,
        public resolve: (value: any) => void
    ) {
    }

    pop(value?: any) {
        this.resolve(value);
    }

}

export type ModalStack = {
    push<T>(layout: Layout): { pop(result?: T) } & PromiseLike<T>;
    pop(key: string);
};

export const ModalStackContext = createContext<ModalStack | null>(null);

export const ModalStackItemContext = createContext<ModalStackItem | null>(null);

export class ModalStackProvider extends Component<{ children?: ReactNode }>
    implements ModalStack {

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
                            children: Layout(item.layout)
                        })
                    })
                ).toArray(),
                this.props.children
            ])
        })
    }


    push<T>(layout: Layout): { pop(result?: T) } & PromiseLike<T> {
        const key = RandomId();
        const waiter = Waiter();
        this.items = this.items.set(key, new ModalStackItem(
            layout,
            key,
            value => {
                waiter.resolve(value);
                this.pop(key);
            }
        ));
        return {
            pop: (result?) => {
                this.pop(key);
                waiter.resolve(result);
            },
            then: waiter.then.bind(waiter)
        }
    }

    pop(key: string) {
        this.items = this.items.delete(key);
    }
}

export const useModalStack = () => useDefinedContext(ModalStackContext);

export const useModalStackItem = () => useDefinedContext(ModalStackItemContext);
