import {Builder} from "../buildObject";

export function classNameBuilder<T>(
    ...classNames: (string | undefined | false)[]
): { className: Builder<string | undefined> } {
    return {
        className: value => {
            return (value ? value + " " : "") +
                classNames.filter(value => value && (typeof value === "string"))
                    .join(" ")
        }
    }
}
