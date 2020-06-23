import {assert} from "../assert";

const markToDelete = Symbol("deleted");


const map = new WeakMap();

export function Lazy<T extends (...args) => any>(callback: T): T
export function Lazy(): MethodDecorator
export function Lazy(callback?): any {
    if (callback) {
        return lazyCallback(callback);
    } else {
        return (target, prop, desc) => {
            if (typeof desc.get === "function") {
                lazyProperty(target, prop, desc);

            } else if (typeof desc.value === "function") {
                lazyMethod(target, prop, desc);
            }
        }
    }
}


function lazyCallback(callback) {
    return (...args) => {
        if (map.has(callback))
            return map.get(callback);
        const value = callback(...args);
        map.set(callback, value);
        return value;
    }
}

function lazyProperty(target, prop, desc) {

    const map = new WeakMap()
    const getter = desc.get;
    assert(!desc.set);
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

}

function lazyMethod(target, prop, desc) {

    const map = new WeakMap()
    const method = desc.value;
    delete desc.value;
    desc.get = function () {
        if (map.has(this))
            return () => map.get(this);

        return (...args) => {
            const value = method.apply(this, ...args);
            map.set(this, value);
            return value;
        }
    };

    desc.set = function (value) {
        if (value === markToDelete) {
            map.delete(this)
        } else {
            throw new Error(`Can't set lazy method.`)
        }
    }
}


Lazy.delete = function (target, prop?) {
    if (prop) {
        target[prop] = markToDelete;
    } else {
        map.delete(target);
    }
}
