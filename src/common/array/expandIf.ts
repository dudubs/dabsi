type Falsy = false | undefined | null;

export function expandIf<T>(condition: T):
    undefined | [] {
    return condition ? undefined : []
}
