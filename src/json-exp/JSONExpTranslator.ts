import {firstDefinedEntry} from "../common/object/firstDefinedEntry";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {
    JSONCompareOperator,
    JSONExp,
    JSONExpTypes,
    JSONFieldExp,
    JSONFieldKey,
    JSONFieldsExp,
    JSONNamedOperator,
    JSONPrimitive,
    JSONSymbolicToNamedOperator
} from "./JSONExp";


export type JSONExpTranslatorMethods<T, U> = {
    [K in keyof JSONExpTypes<T>]: (exp: JSONExpTypes<T>[K]) => U
}

export abstract class JSONExpTranslator<T, U>
    implements JSONExpTranslatorMethods<T, U> {


    abstract translateCompare(op: JSONNamedOperator, left: U, right: U): U;

    abstract True: U;

    abstract False: U;

    abstract translateValue(value: JSONPrimitive): U;

    abstract translateFieldExp(key: JSONFieldKey<T>): U;

    abstract translateIn(where: U, values: U[]): U;

    translateInExp(where: JSONExp<T>, values: JSONExp<T>[]): U {
        return this.translateIn(
            this.translate(where),
            values.map(value => this.translate(value))
        )
    }

    translateCompareExp(op: JSONNamedOperator, left: JSONExp<T>, right: JSONExp<T>): U {
        return this.translateCompare(op, this.translate(left), this.translate(right))
    }

    translateArrayExp(exp: JSONExp<T> & any[]): U {
        if (exp.length === 3) {
            const [left, op, right] = exp;
            // [exp, "$in", exps...]
            if (op === "$in") {
                return this.translateInExp(left, <JSONExp<T>[]>right)
            }
            return this.translateCompareExp(
                (JSONSymbolicToNamedOperator[<JSONCompareOperator>op] ?? op),
                left,
                (<JSONExp<T>>right)
            );
        } else if (exp.length === 2) {
            const [left, opToValue] = exp;
            if (Array.isArray(opToValue)) {
                // [left, [$op, exp]]
                const [op, exp] = opToValue;
                if (op === "$in") {
                    // [left, ["$in", exps...]]
                    return this.translateInExp(left, exp)
                }
                return this.translate([left, op, exp]);
            } else {
                const [op, value] = firstDefinedEntry(opToValue);
                if (op === "$in") {
                    return this.translateInExp(left,
                        value.map(value => ({$value: value}))
                    )
                }
                return this.translate([left, <JSONCompareOperator>op, {$value: value}])
            }
        }
        throw new TypeError(`Invalid JSONArrayExp ${exp}`);
    }

    translateObjectExp(exp: JSONExp<T> & object): U {
        if (Array.isArray(exp)) {
            return this.translateArrayExp(exp)
        }
        const [key, value] = firstDefinedEntry(exp);
        if (key.startsWith("$")) {
            return this[key](value)
        }

        return this.translateAll(mapObjectToArray(<JSONFieldsExp<T>>exp,
            (exp, key) => this.translateAtFieldExp(<any>key, <any>exp)
        ))
    }

    translate(exp: JSONExp<T>): U {
        switch (typeof exp) {
            case "boolean":
                return exp ? this.True : this.False;

            case "number":
                return this.translateValue(exp);

            case "undefined":
                return this.True;

            case "string":
                return this.translateFieldExp(exp);

            case "object":
                return this.translateObjectExp(exp);
        }
        throw new Error(`Can't translate ${JSON.stringify(exp)}`)
    }

    translateAtFieldExp<K extends JSONFieldKey<T>>(
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
                return this.translateCompareExp("$equals", key, {$value: fieldExp})
        }
        throw new TypeError(`Invalid FieldExp: ${JSON.stringify(fieldExp)}`)
    }


    abstract translateConcat(exps: U[]): U;

    abstract translateAll(exps: U[]): U;

    abstract translateAny(exps: U[]): U;

    abstract translateIs(exp: T): U;

    $is(exp: JSONExpTypes<T>["$is"]): U {
        return this.translateIs(exp);
    }

    abstract translateKey(key: string): U;

    $key(exp: JSONExpTypes<T>['$key']): U {
        if (typeof exp === "string")
            return this.translateKey(exp);
        // TODO: optimize to SQL "IN" statement.
        return this.translateAny(exp.map(exp => this.translateKey(exp)))
    }

    abstract translateFromExp(key: string, take: JSONExp<any>, where: JSONExp<any>): U;

    abstract translateCountExp(key: string, where: JSONExp<any>, maxCount: number): U;

    abstract translateAt(key: string, exp: JSONExp<any>): U;

    abstract translateLength(exp: U): U;

    abstract translateNot(exp: U): U;

    $length(exp: JSONExpTypes<T>["$length"]): U {
        return this.translateLength(this.translate(exp))
    }

    $all(exp: JSONExpTypes<T>["$all"]): U {
        return this.translateAll(exp.map(exp => this.translate(exp)));
    }

    $any(exp: JSONExpTypes<T>["$any"]): U {
        return this.translateAny(exp.map(exp => this.translate(exp)));
    }

    $at(exp: JSONExpTypes<T>["$at"]): U {
        const [key, subExp] = firstDefinedEntry(exp);
        return this.translateAt(<any>key, subExp)
    }

    $concat(exp: JSONExpTypes<T>["$concat"]): U {
        return this.translateConcat(exp.map(exp => this.translate(exp)));
    }

    $count(exp: JSONExpTypes<T>["$count"]): U {
        if (typeof exp === "string") {
            return this.translateCountExp(exp, undefined, 0);
        } else if (typeof exp === "object") {
            const [key, subExp] = firstDefinedEntry(exp)
            return this.translateCountExp(key, subExp, 0);
        }
        throw new TypeError()
    }

    $from(exp: JSONExpTypes<T>["$from"]): U {
        const [key, {take, where}] = firstDefinedEntry(exp)
        return this.translateFromExp(key, take, where);

    }

    $has(exp: JSONExpTypes<T>["$has"]): U {
        if (typeof exp === "string") {
            return this.translateCountExp(exp, undefined, 1)
        } else if (typeof exp === "object") {
            const [key, subExp] = firstDefinedEntry(exp)
            return this.translateCountExp(key, subExp, 1);
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

    $join<K>([exps, sep]: JSONExpTypes<T>["$join"]): U {
        const $concat: JSONExp<T>[] = [];
        for (const [index, exp] of exps.entries()) {
            if (index)
                $concat.push({$value: sep})
            $concat.push(exp);
        }
        return this.translate({$concat});
    }


    $not<K>(value: JSONExpTypes<T>["$not"]): U {
        return this.translateNot(this.translate(value))
    }
}

