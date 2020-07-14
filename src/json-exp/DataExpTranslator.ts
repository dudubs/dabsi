import {firstDefinedEntry} from "../common/object/firstDefinedEntry";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {

    Comparator,
    DataExp,
    DataExpOperatorsTypes,
    Parameter,
    CompareOperator,
    StringDataExp,
    NamedCompareOperator, SymbolicCompareOperator,
} from "./DataExp";

const SymbolicToNamedOperator:
    Record<SymbolicCompareOperator, NamedCompareOperator> = {
    '^=': '$startsWith',
    '$=': '$endsWith',
    '*=': '$contains',
    '=': '$equals',
    '!=': '$notEquals',
    '<': '$lessThan',
    '<=': '$lessThanOrEqual',
    '>': '$greaterThan',
    '>=': '$greaterThanOrEqual',
};

export type DataExpTranslatorMethods<T, U> = {
    [K in keyof DataExpOperatorsTypes<T>]: (exp: DataExpOperatorsTypes<T>[K]) => U
}

export abstract class DataExpTranslator<T, U>
    implements DataExpTranslatorMethods<T, U> {


    abstract translateCompare(op: NamedCompareOperator, left: U, right: U): U;

    abstract True: U;

    abstract False: U;

    abstract Null: U;

    abstract translateValue(value: Parameter): U;

    abstract translateFieldExp(key: StringDataExp<T>): U;

    abstract translateIn(where: U, values: U[]): U;

    abstract translateNotIn(where: U, values: U[]): U;

    translateInExp(where: DataExp<T>, values: DataExp<T>[]): U {
        if(values.length===0)
            return this.True

        if (values.length === 1)
            return this.translateCompare('$equals',
                this.translate(where), this.translate(values[0]));

        return this.translateIn(
            this.translate(where),
            values.map(value => this.translate(value))
        )
    }

    translateNotInExp(where: DataExp<T>, values: DataExp<T>[]): U {
        if(values.length===0)
            return this.True

        if (values.length === 1)
            return this.translateCompare('$notEquals',
                this.translate(where), this.translate(values[0]));

        return this.translateNotIn(
            this.translate(where),
            values.map(value => this.translate(value))
        )
    }

    translateCompareExp(op: NamedCompareOperator, left: DataExp<T>, right: DataExp<T>): U {
        return this.translateCompare(op, this.translate(left), this.translate(right))
    }

    translateArrayExp(exp: DataExp<T> & any[]): U {
        if (exp.length === 1)
            return this.translateValue(exp[0]);

        if (exp.length === 3) {
            const [left, op, right] = exp;
            switch (op) {
                case "$in":
                    return this.translateInExp(left, <DataExp<T>[]>right);
                case "$notIn":
                    return this.translateNotInExp(left, <DataExp<T>[]>right)
                default:
                    return this.translateCompareExp(
                        (SymbolicToNamedOperator[<CompareOperator>op] ?? op),
                        left,
                        (<DataExp<T>>right)
                    );
            }
        } else if (exp.length === 2) {
            const [left, opToValue] = exp;
            if (Array.isArray(opToValue)) {
                // [left, [$op, exp]]
                const [op, exp] = opToValue;
                switch (op) {
                    case "$in":
                        return this.translateInExp(left, exp);
                    case "$notIn":
                        return this.translateNotInExp(left, exp);
                    default:
                        return this.translate([left, op, exp]);
                }
            } else {
                const [op, value] = firstDefinedEntry(opToValue);
                if (op === "$in") {
                    return this.translateInExp(left,
                        value.map(value => ({$value: value}))
                    )
                }
                return this.translate([left, <CompareOperator>op, {$value: value}])
            }
        }
        throw new TypeError(`Invalid JSONArrayExp ${exp}`);
    }

    translateObjectExp(exp: DataExp<T> & object): U {
        if (Array.isArray(exp)) {
            return this.translateArrayExp(exp)
        }
        const [key, value] = firstDefinedEntry(exp);
        if (key.startsWith("$")) {
            return this[key](value)
        }

        return this.translateAnd(
            mapObjectToArray(<any>exp,
                (exp, key) => this.translateAtFieldExp(<any>key, <any>exp)
            ))
    }

    translate(exp: DataExp<T>): U {
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
                if (!exp)
                    return this.Null;
                return this.translateObjectExp(exp);
        }
        throw new Error(`Can't translate ${JSON.stringify(exp)}`)
    }

    translateAtFieldExp<K extends StringDataExp<T>>(
        key: K,
        fieldExp: Comparator<T, Extract<T[K], Parameter>>): U {
        switch (typeof fieldExp) {
            case "object":
                if (Array.isArray(fieldExp)) {
                    const [op, exp] = fieldExp;
                    return this.translate([key, <CompareOperator>op, exp]);
                } else {
                    const [op, value] =
                        firstDefinedEntry(fieldExp);

                    if (op === "$in") {
                        return this.translateIn(
                            this.translate(key),
                            value.map(value =>
                                this.translateValue(value))
                        )
                    }

                    return this.translate([
                        <StringDataExp<T>>key,
                        <CompareOperator>op,
                        {$value: value}
                    ])
                }
            case "boolean":
            case "string":
            case "number":
                return this.translateCompareExp("$equals", key, {$value: fieldExp});
        }
        throw new TypeError(`Invalid FieldExp ${key}: ${JSON.stringify(fieldExp)}`)
    }


    abstract translateConcat(exps: U[]): U;

    abstract translateAnd(exps: U[]): U;

    abstract translateOr(exps: U[]): U;


    abstract translateIs(key: string): U;

    $is(exp: DataExpOperatorsTypes<T>['$is']): U {
        if (typeof exp === "string")
            return this.translateIs(exp);
        // TODO: optimize to SQL "IN" statement.
        return this.translateOr(exp.map(exp => this.translateIs(exp)))
    }

    abstract translateFromExp(key: string, take: DataExp<any>, where: DataExp<any>): U;

    abstract translateCountExp(key: string, where: DataExp<any>, maxCount: number): U;

    abstract translateAt(key: string, exp: DataExp<any>): U;

    abstract translateLength(exp: U): U;

    abstract translateNot(exp: U): U;

    $length(exp: DataExpOperatorsTypes<T>["$length"]): U {
        return this.translateLength(this.translate(exp))
    }

    $and(exp: DataExpOperatorsTypes<T>["$and"]): U {
        return this.translateAnd(exp.map(exp => this.translate(exp)));
    }

    $or(exp: DataExpOperatorsTypes<T>["$or"]): U {
        return this.translateOr(exp.map(exp => this.translate(exp)));
    }

    abstract translateIsNull(exp: U): U;

    abstract translateIsNotNull(exp: U): U;

    $at(exp: DataExpOperatorsTypes<T>["$at"]): U {
        const [key, subExp] = firstDefinedEntry(exp);
        return this.translateAt(<any>key, subExp)
    }

    $isNull(exp: DataExpOperatorsTypes<T>['$isNull']): U {
        return this.translateIsNull(this.translate(exp));
    }

    $isNotNull(exp: DataExpOperatorsTypes<T>['$isNotNull']): U {
        return this.translateIsNotNull(this.translate(exp));
    }

    abstract translateIfNull(exp: U, alt_value: U): U;

    $ifNull([left, _else]: DataExpOperatorsTypes<T>['$ifNull']): U {
        return this.translateIfNull(
            this.translate(left),
            this.translate(_else)
        )
    }

    $concat(exp: DataExpOperatorsTypes<T>["$concat"]): U {
        return this.translateConcat(exp.map(exp => this.translate(exp)));
    }

    $count(exp: DataExpOperatorsTypes<T>["$count"]): U {
        if (typeof exp === "string") {
            return this.translateCountExp(exp, undefined, 0);
        } else if (typeof exp === "object") {
            const [key, subExp] = firstDefinedEntry(exp)
            return this.translateCountExp(key, subExp, 0);
        }
        throw new TypeError()
    }

    $from(exp: DataExpOperatorsTypes<T>["$from"]): U {
        const [key, {take, where}] = firstDefinedEntry(exp)
        return this.translateFromExp(key, take, where);

    }

    $has(exp: DataExpOperatorsTypes<T>["$has"]): U {
        if (typeof exp === "string") {
            return this.translateCountExp(exp, undefined, 1)
        } else if (typeof exp === "object") {
            const [key, subExp] = firstDefinedEntry(exp)
            return this.translateCountExp(key, subExp, 1);
        }
        throw new TypeError(`Invalid "has" Exp`)
    }

    $search(exp: DataExpOperatorsTypes<T>["$search"]): U {
        const words = exp.text.split(/[\s\t\r\n]+/g)
            .filter(text => text);
        if (words.length === 0)
            return this.True;
        return this.translate({
            $and: words.map(word => [
                exp.in,
                "$contains",
                {$value: word}
            ])
        });
    }

    $value(exp: DataExpOperatorsTypes<T>["$value"]): U {
        return this.translateValue(exp);
    }


    $join<K>([exps, sep]: DataExpOperatorsTypes<T>["$join"]): U {
        const $concat: DataExp<T>[] = [];
        for (const [index, exp] of exps.entries()) {
            if (index)
                $concat.push({$value: sep})
            $concat.push(exp);
        }
        return this.translate({$concat});
    }


    $not<K>(value: DataExpOperatorsTypes<T>["$not"]): U {
        return this.translateNot(this.translate(value))
    }

    abstract translateIf(condition: U,
                         then: U,
                         _else: U): U;

    $if<K>(exp: DataExpOperatorsTypes<T>["$if"]): U {
        if (Array.isArray(exp)) {
            return this.translateIf(
                this.translate(exp[0]),
                this.translate(exp[1]),
                this.translate(exp[2] ?? null)
            )
        } else {
            return this.translateIf(
                this.translate(exp.condition),
                this.translate(exp.then),
                this.translate(exp.else ?? null)
            )
        }
    }

    $case(cases: DataExpOperatorsTypes<T>['$case']): U {
        const translate = (index: number) => {
            const exp = cases[index];
            if (!exp)
                return this.Null;
            const [condition, then] = Array.isArray(exp) ? exp : [exp.if, exp.then];
            return this.translateIf(
                this.translate(condition),
                this.translate(then),
                translate(index + 1)
            )
        };
        return translate(0);
    }
}


/*

    $case:[
        [{$isNull: ""}, ],

        {default: ""}

    ]

 */
