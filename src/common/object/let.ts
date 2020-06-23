declare global {
    interface Object {
        let<T, U>(this: T, callback: (value: NonNullable<T>) => U): U;
    }


}

function _let(callback) {
    return callback(this)
}


export function useLet() {
    [Object, Number, String, Array].forEach(({prototype}) => {
        Object.defineProperty(prototype, "let", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: _let
        });

    });
}
