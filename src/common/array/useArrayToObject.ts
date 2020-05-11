import {Lazy} from "../patterns/lazy";
import {mapArrayToObject} from "./mapArrayToObject";

declare global {
    interface Array<T> {
        toObject<U>(callback: (item: T, index: number) => [string, U] | undefined): Record<string, U>;
    }
}


export const useArrayToObject = Lazy(() => {
    Array.prototype.toObject = function (callback) {
        return mapArrayToObject(this, callback)
    }
});

