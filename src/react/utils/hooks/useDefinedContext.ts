import {useContext} from "react";
import {defined} from "../../../common/object/defined";
import {ContextOrType} from "../ContextOrType";

export function useDefinedContext<T>(context: ContextOrType<T>): NonNullable<T> {
    return defined(useContext(ContextOrType(context)), () =>
        `No defined context ${
            ContextOrType(context).displayName
        }`);
}


