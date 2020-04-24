export function isPlainObject(o) {
    return o && (typeof o === "object") && (Object.getPrototypeOf(o) === Object.prototype);
}
