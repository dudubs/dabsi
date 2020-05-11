import {Seq} from "immutable";
import {Lazy} from "../patterns/lazy";
declare global {
    interface Array<T> {
        toSeq(): Seq.Indexed<T>;
    }
}

export const useArrayToSeq = Lazy(() => {
    Array.prototype.toSeq = function () {
        return Seq.Indexed(this)
    }
})
