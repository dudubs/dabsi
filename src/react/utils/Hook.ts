import {ReactElement} from "react";

export function Hook<T>(props: { of: () => T, children: (value: T) => ReactElement }) {
    return props.children(props.of())

}
