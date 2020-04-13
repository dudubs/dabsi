import {firstDefinedEntry} from "../common/object/firstDefinedEntry";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {ArrayTypeOrObject, KeysByValue} from "../common/typings";
import {
    JSONExp,
    JSONExpTypes,
    JSONFieldExp,
    JSONFieldKey,
    JSONFieldsExp,
    JSONNamedOperator,
    JSONCompareOperator,
    JSONSymbolicToNamedOperator,
    JSONPrimitive
} from "./JSONExp";


export type JSONExpMethods<T, U> = {
    [K in keyof JSONExpTypes<T>]: (exp: JSONExpTypes<T>[K]) => U
}

export abstract class JSONExpTranslator<T, U> implements JSONExpMethods<T, U> {

    abstract concat(exps: U[]): U;

    abstract all(exps: U[]): U;

    abstract any(exps: U[]): U;

    abstract translateCompare(op: JSONNamedOperator, left: JSONExp<T>, right: JSONExp<T>): U;

    abstract translateCount(key: string, where: JSONExp<any>, maxCount: number): U;

    abstract True: U;

    abstract False: U;

    abstract translateFrom(key: string, take: JSONExp<any>, where: JSONExp<any>): U;

    abstract translateValue(value: JSONPrimitive): U;

    abstract translateAt<K extends KeysByValue<T, object>>(key: K, expr: JSONExp<ArrayTypeOrObject<T[K]>>): U;

    abstract translateField(key: JSONFieldKey<T>): U;

    abstract $is(exp: JSONExpTypes<T>["$is"]): U;

    abstract $length(exp: JSONExpTypes<T>["$length"]): U;

    abstract $not(exp: JSONExpTypes<T>["$not"]): U;

    abstract translateIn(where: JSONExp<T>, values: JSONExp<T>[]): U;

    translate(exp: JSONExp<T>): U {

        switch (typeof exp) {
            case "boolean":
                return exp ? this.True : this.False;

            case "number":
                return this.$value(exp);

            case "undefined":
                return this.True;

            case "string":
                return this.translateField(exp);

            case "object":
                if (Array.isArray(exp)) {
                    if (exp.length === 3) {
                        const [left, op, right] = exp;

                        // [exp, "$in", exps[]]
                        if (op === "$in") {
                            return this.translateIn(left, <JSONExp<T>[]>right)
                        }
                        return this.translateCompare(
                            (JSONSymbolicToNamedOperator[<JSONCompareOperator>op] ?? op),
                            left,
                            <JSONExp<T>>right
                        );
                    } else if (exp.length === 2) {
                        const [left, opToValue] = exp;
                        if (Array.isArray(opToValue)) {
                            const [op, exp] = opToValue;
                            if (op === "$in") {
                                return this.translateIn(left, exp)
                            }
                            return this.translate([left, op, exp]);
                        } else {
                            const [op, $value] = firstDefinedEntry(opToValue);
                            if (op === "$in") {
                                return this.translateIn(left, $value.map($value => ({$value})))
                            }
                            return this.translate([left, <JSONCompareOperator>op, {$value}])
                        }
                    }
                    throw new TypeError(`Invalid JSONArrayExp ${exp}`);
                } else if (exp) {
                    const [key, value] = firstDefinedEntry(exp);
                    if (key.startsWith("$")) {
                        return this[key](value);
                    }

                    return this.all(
                        mapObjectToArray(<JSONFieldsExp<T>>exp,
                            (exp, key) => this.translateAtField(<any>key, <any>exp)
                        )
                    )
                }
        }
        throw new Error(`Can't translate ${JSON.stringify(exp)}`)
    }

    translateAtField<K extends JSONFieldKey<T>>(
        key: K,
        fieldExp: JSONFieldExp<T, Extract<T[K], JSONPrimitive>>): U {
        switch (typeof fieldExp) {
            case "object":
                if (Array.isArray(fieldExp)) {
                    const [op, exp] = fieldExp;
                    return this.translate([key, <JSONCompareOperator>op, exp]);
                } else {

                    const [op, value] =
                        firstDefinedEntry(fieldExp);
                    return this.translate([
                        <JSONFieldKey<T>>key,
                        <JSONCompareOperator>op,
                        {$value: value}
                    ])
                }
            case "boolean":
            case "string":
            case "number":
                return this.translateCompare("$equals", key, {$value: fieldExp})
        }
        throw new TypeError(`Invalid FieldExp: ${JSON.stringify(fieldExp)}`)
    }


    $all(exp: JSONExpTypes<T>["$all"]): U {
        return this.all(exp.map(exp => this.translate(exp)));
    }

    $any(exp: JSONExpTypes<T>["$any"]): U {
        return this.any(exp.map(exp => this.translate(exp)));
    }

    $at(exp: JSONExpTypes<T>["$at"]): U {
        const [key, subExp] = firstDefinedEntry(exp);
        return this.translateAt(<any>key, subExp)
    }

    $concat(exp: JSONExpTypes<T>["$concat"]): U {
        return this.concat(exp.map(exp => this.translate(exp)));
    }

    $count(exp: JSONExpTypes<T>["$count"]): U {
        if (typeof exp === "string") {
            return this.translateCount(exp, undefined, 0);
        } else if (typeof exp === "object") {
            const [key, subExp] = firstDefinedEntry(exp)
            return this.translateCount(key, subExp, 0);
        }
        throw new TypeError()
    }

    $from(exp: JSONExpTypes<T>["$from"]): U {
        const [key, {take, where}] = firstDefinedEntry(exp)
        return this.translateFrom(key, take, where);

    }

    $has(exp: JSONExpTypes<T>["$has"]): U {
        if (typeof exp === "string") {
            return this.translateCount(exp, undefined, 1)
        } else if (typeof exp === "object") {
            const [key, subExp] = firstDefinedEntry(exp)
            return this.translateCount(key, subExp, 1);
        }
        throw new TypeError(`Invalid "has" Exp`)
    }

    $search(exp: JSONExpTypes<T>["$search"]): U {
        const words = exp.text.split(/[\s\t\r\n]+/g)
            .filter(text => text);
        if (words.length === 0)
            return this.True;
        return this.translate({
            $all: words.map(word => [
                exp.in,
                "$contains",
                {$value: word}
            ])
        });
    }

    $value(exp: JSONExpTypes<T>["$value"]): U {
        return this.translateValue(exp);
    }

    $isNot(exp: T) {
        return this.$not({$is: exp});
    }
}

