export function assert(value, message?: string | (() => string)): asserts value {
    if (!value) throw new Error(
        typeof message === "function" ? message() :
            message
    )
}
