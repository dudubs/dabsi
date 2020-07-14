export function defined<T>(value: T, errorOrCallback?): NonNullable<T> {
    if (value == null)
        throw new Error(
            typeof errorOrCallback === "function" ? errorOrCallback() :
                errorOrCallback);
    // @ts-ignore
    return value;
}


