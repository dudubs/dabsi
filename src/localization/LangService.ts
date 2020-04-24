import {LangMap} from "./LangMap";

export class LangService {
    constructor(public map: LangMap) {

    }

    translate(token: string, props?): string {
        const value = this.map[token];
        if (typeof value === "function")
            return value(props);
        return value ?? token;
    }

}

