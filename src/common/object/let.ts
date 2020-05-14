declare global {
    interface Object {
        let<U, T>(this: U, callback: (value: NonNullable<U>) => T): T;
    }

    interface Array<T> {
        let<U>(callback: (value: T[]) => U): U;

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
            writable:true,
            value: _let
        });

    });
}
