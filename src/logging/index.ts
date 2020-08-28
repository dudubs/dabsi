import {mapObjectToArray} from "../common/object/mapObjectToArray";

type Logger = {
    (
        callback: (
            formatter: (strings: TemplateStringsArray, ...args) => any
        ) => any
    ): void;
};

// trying to require "util" module.
const util:undefined|{
    inspect
} = ((r, m) => {
    try {
        return r(m)
    } catch (error) {
    }
})(require, "util");


inspect.custom = util?.inspect.custom ?? Symbol();

export function inspect(...args): string {
    const [value] = args;

    if(typeof value?.inspect==="function") {
        return value.inspect();
    }

    if (util)
        return util.inspect.apply(util, args)

    const method = value?.[inspect.custom];
    if (method)
        return method.apply(value)
    if (Array.isArray(value)) {
        return '[' + value.toSeq().map(value => inspect(value))
            .join(", ") + ']'
    }
    if (Object.getPrototypeOf(value) === Object.prototype) {
        return `{${mapObjectToArray(value, (value, key) =>
            inspect(key) + ': ' + inspect(value)
        )}}`
    }
    return JSON.stringify(value)
}


export function createLogger(level): Logger {
    return function (callback) {
        callback((strings, ...args) => {
            let text = "";
            for (const [index, string] of strings.entries()) {
                text += string;
                if (index in args) {
                    text += inspect(args[index])
                }
            }
            console[level](text);
        });
    }
}

export const logDebug = createLogger('debug');
export const logInfo = createLogger('info');
export const logError = createLogger('error');
