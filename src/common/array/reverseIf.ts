export function reverseIf<T>(condition, ...args: T[]): T[] {
    return condition ? args.reverse() : args;
}
