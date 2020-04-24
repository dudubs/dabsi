import {defined} from "../object/defined";

function LazyCallback<T extends (...args) => any>(callback: T): T {
    let value;
    let hasValue;
    return <T>((...args) => {
        return hasValue ? value : (hasValue = true, value = callback(
            ...args
        ));
    })
}

function LazyProperty(target, prop: string, desc: PropertyDescriptor) {
    const getter = defined(desc.get, 'No getter');
    const map = new WeakMap();
    desc.get = function () {
        if (map.has(this)){
            return map.get(this);
        }
        const value = getter.apply(this);
        map.set(this,value);
        return value;
    }
}

export const Lazy: (typeof LazyCallback & typeof LazyProperty) =
    ((arg0, arg1?, desc?): any => {
        if (typeof arg1 === "string") {
            return LazyProperty(arg0, arg1, desc)
        } else {
            return LazyCallback(arg0);
        }
    });
