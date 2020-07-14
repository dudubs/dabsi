export function expectKeyNotInObject(obj, key) {
    if (key in obj) {
        fail(`Have a key "${key}"`)
    }
}

export function expectKeyInObject(obj, key) {
    if (!(key in obj)) {
        fail(`Not have a key "${key}"`)
    }
}
