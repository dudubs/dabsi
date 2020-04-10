import {Context, createContext, useContext} from "react";
import {defined} from "../../object/defined";
import {ContextOrType} from "../ContextOrType";

export function useDefinedContext<T>(context: ContextOrType<T>): T {
    return defined(useContext(ContextOrType(context)), () =>
        `No defined context ${
            ContextOrType(context).displayName
        }`);
}


export function useContextOrType<T>(context: ContextOrType<T>): T | undefined {
    return useContext(ContextOrType(context))
}

export function createUndefinedContext<T>(): Context<T | undefined> {
    return createContext<T | undefined>(undefined)
}
