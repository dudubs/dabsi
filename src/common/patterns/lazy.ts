const markToDelete = Symbol();


const map = new WeakMap();

export function Lazy<T extends (...args) => any>(callback: T): T
export function Lazy(): MethodDecorator
export function Lazy(callback?): any {
    if (callback) {
        return (...args) => {
            if (map.has(callback))
                return map.get(callback);
            const value = callback(...args);
            map.set(callback, value);
            return value;
        }
    } else {
        return (target, prop, desc) => {
            const map = new WeakMap()
            if (typeof desc.get === "function") {
                const getter = desc.get;
                desc.set = function (value) {
                    if (markToDelete === value) {
                        map.delete(this)
                    } else {
                        map.set(this, value);
                    }
                }
                desc.get = function () {
                    if (map.has(this)) {
                        return map.get(this);
                    }
                    const value = getter.apply(this);
                    map.set(this, value);
                    return value;
                }
            } else if (typeof desc.value === "function") {
                const method = desc.value;
                Object.defineProperty(target, prop, {
                    get() {
                        if (map.has(this))
                            return () => map.get(this);

                        return (...args) => {
                            const value = method.apply(this, ...args);
                            map.set(this, value);
                            return value;
                        }
                    },
                    set(value) {
                        if (value === markToDelete) {
                            map.delete(this)
                        } else {
                            throw new Error(`Can't set lazy method.`)
                        }
                    }
                })
            }
        }
    }
}


Lazy.delete = function (target, prop?) {
    if(prop) {
        target[prop] = markToDelete;
    } else {
        map.delete(target);
    }
}
