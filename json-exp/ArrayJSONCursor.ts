import {JSONCursor} from "./JSONCursor";

export class ArrayJSONCursor<T> extends JSONCursor<T> {
    constructor(
        public data: T[],
        public getId: (row: any) => string | number
    ) {
        super();
    }


}
