import {Merger} from "../../common/object/Merger";


export const mergeCallback = Merger<((...args) => void) | undefined>((left, right) => {
    if (!left)
        return right;
    if (!right)
        return left;
    return (...args) => {
        left(...args);
        right(...args);
    }
});
