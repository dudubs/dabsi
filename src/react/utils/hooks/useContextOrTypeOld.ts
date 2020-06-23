import {useContext} from "react";
import {ContextOrType} from "../ContextOrType";

export function useContextOrTypeOld<T>(context: ContextOrType<T>): T | undefined {
    return useContext(ContextOrType(context))
}
