export function expectHaveKey(obj, key) {
    if (key in obj) {
        fail(`Have a key "${key}"`)
    }
}

export function expectNotHaveKey(obj, key) {
    if (!(key in obj)) {
        fail(`Not have a key "${key}"`)
    }
}
