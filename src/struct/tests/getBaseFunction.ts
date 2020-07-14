export function getBaseFunction(target: Function): Function | undefined {
    const base = Object.getPrototypeOf(target);
    if (typeof base === "function")
        return base
}

