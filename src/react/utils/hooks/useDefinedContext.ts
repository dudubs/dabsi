import {useContext} from "react";
import {defined} from "@dabsi/common/object/defined";
import {ContextOrType} from "@dabsi/react/utils/ContextOrType";

export function useDefinedContext<T>(context: ContextOrType<T>): NonNullable<T> {
    return defined(useContext(ContextOrType(context)), () =>
        `No defined context ${
            ContextOrType(context).displayName
        }`);
}


