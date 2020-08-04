export function hasKeys(object: object | undefined) {
    if (object) for (let key in object) {
        if (object.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}
