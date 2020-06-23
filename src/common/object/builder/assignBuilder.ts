import {Builder} from "../buildObject";

export function assignBuilder<T>(
    props: Partial<T>
): Builder<T> {
    return obj => {
        return {...obj, ...props}
    }
}
