import {ReactElement} from "react";

export function Hook(props: { children: () => ReactElement }) {
    return props.children()

}
