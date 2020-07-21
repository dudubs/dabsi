import {firstDefinedEntry} from "../common/object/firstDefinedEntry";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {
    Comparator,
    CompareOperator,
    DataExp,
    DataExpOperatorsTypes,
    NamedCompareOperator,
    Parameter,
    StringDataExp,
    SymbolicCompareOperator,
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

    abstract translateIn(inverse: boolean, where: U, values: U[]): U;


    translateInExp(inverse: boolean, where: DataExp<T>, values: DataExp<T>[]): U {
        if (values.length === 0)
            return this.True

        if (values.length === 1)
            return this.translateCompare(inverse ? '$notEquals' : '$equals',
                this.translate(where), this.translate(values[0]));

        return this.translateIn(
            inverse,
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
            // [exp, op, exp]
            const [left, op, right] = exp;
            switch (op) {
                case "$in":
                    return this.translateInExp(false, left, <DataExp<T>[]>right);
                case "$notIn":
                    return this.translateInExp(true, left, <DataExp<T>[]>right)

            }
            return this.translateCompareExp(
                (SymbolicToNamedOperator[<CompareOperator>op] ?? op),
                left,
                (<DataExp<T>>right)
            );
        } else if (exp.length === 2) {
            // [exp, {op: parameter}]
            const [left, opToValue] = exp;
            const [op, value] = firstDefinedEntry(opToValue);
            switch (op) {
                case "$in":
                    return this.translateInExp(false, left,
                        value.map(value => [value]));
                case "$notIn":
                    return this.translateInExp(true, left,
                        value.map(value => [value])
                    );
            }
            return this.translate([left, <CompareOperator>op, {$value: value}]);
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

                    switch (op) {
                        case "$in":
                            return this.translateInExp(false,
                                key,
                                value.map(value => [value])
                            );
                        case "$notIn":
                            return this.translateInExp(true,
                                key,
                                value.map(value => [value])
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

    abstract translateIs(inverse: boolean, keys: string[]): U;

    $is(exp: DataExpOperatorsTypes<T>['$is']): U {
        if (typeof exp === "string")
            return this.translateIs(false, [exp]);
        return this.translateIs(false, exp)
    }


    $isNot(exp: DataExpOperatorsTypes<T>['$is']): U {
        if (typeof exp === "string")
            return this.translateIs(true, [exp]);
        return this.translateIs(true, exp)
    }


    abstract translateCountExp(propertyName: string, subExp: DataExp<any>): U;

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

    abstract translateIsNull(inverse: boolean, exp: U): U;

    abstract translateAs(asKey: string, asExp: DataExp<any>): U;

    $as(exp: DataExpOperatorsTypes<T>['$as']): U {
        const [asKey, asExp] = firstDefinedEntry(exp);
        return this.translateAs(asKey, asExp);
    }

    $at(exp: DataExpOperatorsTypes<T>["$at"]): U {
        const [key, subExp] = firstDefinedEntry(exp);
        return this.translateAt(<any>key, subExp)
    }

    $isNull(exp: DataExpOperatorsTypes<T>['$isNull']): U {
        return this.translateIsNull(false, this.translate(exp));
    }

    $isNotNull(exp: DataExpOperatorsTypes<T>['$isNotNull']): U {
        return this.translateIsNull(true, this.translate(exp));
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
            return this.translateCountExp(exp, undefined);
        } else if (typeof exp === "object") {
            const [propertyName, subExp] = firstDefinedEntry(exp)
            return this.translateCountExp(propertyName, subExp);
        }
        throw new TypeError()
    }

    abstract translateHasExp(propertyName: string, subExp: DataExp<any>): U;

    $has(exp: DataExpOperatorsTypes<T>["$has"]): U {
        if (typeof exp === "string") {
            return this.translateHasExp(exp, undefined)
        } else if (typeof exp === "object") {
            const [propertyName, subExp] = firstDefinedEntry(exp)
            return this.translateHasExp(propertyName, subExp);
        }
        throw new TypeError(`Invalid "has" Exp`)
    }

    $search(exp: DataExpOperatorsTypes<T>["$search"]): U {
        const words = exp.text.split(/[\s\t\r\n]+/g)
            .filter(text => text);
        if (words.length === 0)
            return this.True;

        let searchInExp: DataExp<any>;
        let inverse: boolean;

        if ('in' in exp) {
            searchInExp = exp.in
            inverse = true;
        } else {
            inverse = true;
            searchInExp = exp.notIn
        }

        return this.translate({
            $and:
                words.map(word => [
                    searchInExp,
                    inverse ? "$notContains" : "$contains",
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


    $not<K>(exp: DataExpOperatorsTypes<T>["$not"]): U {
        if (exp && (typeof exp === "object") && ('$not' in exp))
            return this.translate(exp.$not);
        return this.translateNot(this.translate(exp))
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

