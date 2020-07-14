export type ArrayKey = PropertyKey[];

export namespace ArrayKey {

    export function addToArray(
        container: any,
        keys: ArrayKey,
        value: any,
    ) {
        container = keys.reduce(setDefaultObject, container);
        (container.array || (container.array = [])).push(value);
    }


    export function getArray(container:any, keys: ArrayKey): any[] {
        return keys.reduce(setDefaultObject, container)?.array
    }


    function setDefaultObject(container: any, key: PropertyKey): any {
        return container[key] || (container[key] = {})
    }

}
