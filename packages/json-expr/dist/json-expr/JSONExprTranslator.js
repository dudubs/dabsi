import { defined } from "../common/object/defined";
import { firstEntry } from "../common/object/firstEntry";
export class JSONExprTranslator {
    translateComplex(c) {
        var _a;
        switch (c.type) {
            case "all":
            case "any":
                if (1 >= c.value.length)
                    return this.translate(c.value[0]);
                return this.translateLogical(c.type === "all", c.value);
            case "count":
                if (typeof c.value === "string") {
                    return this.translateCount(c.value, undefined, 0);
                }
                else if (typeof c.value === "object") {
                    return this.translateCount(c.value.of, c.value.where, (_a = c.value.limit) !== null && _a !== void 0 ? _a : 0);
                }
        }
        throw new Error(`No translator for ${c.type}`);
    }
    translate(expr) {
        switch (typeof expr) {
            case "undefined":
                return this.translate({ boolean: true });
            case "string":
                return this.translate({ field: expr });
            case "object":
                if (Array.isArray(expr)) {
                    const [left, op, right] = expr;
                    return this.translateCompare(op, left, right);
                }
                else if (typeof expr === "object") {
                    const [type, value] = defined(firstEntry(expr));
                    return this.translateComplex({ type, value });
                }
        }
        throw new Error(`Can't translate ${JSON.stringify(expr)}`);
    }
}
