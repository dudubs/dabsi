export function defined(value, errorOrCallback) {
    if (value == null)
        throw new Error(typeof errorOrCallback === "function" ? errorOrCallback() :
            errorOrCallback);
    // @ts-ignore
    return value;
}
