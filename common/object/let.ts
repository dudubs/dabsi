declare global {
    interface Object {
        let<U, T>(this: U, callback: (value: NonNullable<U>) => T): T;
    }

    interface Array<T> {
        let<U>(callback: (value: T[]) => U): U;

        letIfEmpty<U>(callback: (value: NonNullable<T[]>) => U): U | T[];

        letIfOne<U>(): T | T[];

        letIfOne<U>(callback: (value: NonNullable<T[]>) => U): U | T;
    }


}



export function installLet() {
    Object.defineProperty(Object.prototype, "letIfOne", {
        enumerable: false,
        configurable: true,
        value(callback) {
            if (this.length === 1)
                return callback(this);
            return this;
        }
    });
    [Object, Number, String, Array].forEach(({prototype}) => {
        Object.defineProperty(prototype, "let", {
            enumerable: false,
            configurable: true,
            value(callback) {
                return callback(this);
            }
        });

    });
    [String, Array].forEach(({prototype}) => {
        Object.defineProperty(Object.prototype, "letIfEmpty", {
            enumerable: false,
            configurable: true,
            value(callback) {
                if (this.length)
                    return this;
                return callback(this);
            }
        });
    });
}
