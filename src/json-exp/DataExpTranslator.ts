import {firstDefinedEntry} from "../common/object/firstDefinedEntry";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {
    Comparator,
    CompareOperator,
    DataExp,
    DataMappedExpTypes,
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
    [K in keyof DataMappedExpTypes<T>]: (exp: DataMappedExpTypes<T>[K]) => U
}


export abstract class DataExpTranslator<T, U>
    implements DataExpTranslatorMethods<T, U> {


    abstract translateCompare(op: NamedCompareOperator, left: U, right: U): U;

    abstract True: U;

    abstract False: U;

    abstract Null: U;

    abstract translateParameter(value: Parameter): U;

    abstract translateField(propertyName: StringDataExp<T>): U;

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
            return this.translateParameter(exp[0]);

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
            return this.translate([left, <CompareOperator>op, {$parameter: value}]);
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
                return this.translateParameter(exp);

            case "undefined":
                return this.True;

            case "string":
                return this.translateField(exp);

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
                        {$parameter: value}
                    ])
                }
            case "boolean":
            case "string":
            case "number":
                return this.translateCompareExp("$equals", key, {$parameter: fieldExp});
        }
        throw new TypeError(`Invalid FieldExp ${key}: ${JSON.stringify(fieldExp)}`)
    }


    abstract translateConcat(exps: U[]): U;

    abstract translateAnd(exps: U[]): U;

    abstract translateOr(exps: U[]): U;

    abstract translateIs(inverse: boolean, keys: string[]): U;

    $is(exp: DataMappedExpTypes<T>['$is']): U {
        if (typeof exp === "string")
            return this.translateIs(false, [exp]);
        return this.translateIs(false, exp)
    }


    $isNot(exp: DataMappedExpTypes<T>['$is']): U {
        if (typeof exp === "string")
            return this.translateIs(true, [exp]);
        return this.translateIs(true, exp)
    }


    abstract translateCount(propertyName: string, subExp: DataExp<any>): U;

    abstract translateAt(propertyKey: string, exp: DataExp<any>): U;

    abstract translateLength(exp: U): U;

    abstract translateNot(exp: U): U;

    $length(exp: DataMappedExpTypes<T>["$length"]): U {
        return this.translateLength(this.translate(exp))
    }

    $and(exp: DataMappedExpTypes<T>["$and"]): U {
        return this.translateAnd(exp.map(exp => this.translate(exp)));
    }

    $or(exp: DataMappedExpTypes<T>["$or"]): U {
        return this.translateOr(exp.map(exp => this.translate(exp)));
    }

    abstract translateIsNull(inverse: boolean, exp: U): U;

    abstract translateAs(childKey: string, exp: DataExp<any>): U;

    $as(exp: DataMappedExpTypes<T>['$as']): U {
        const [childKey, childExp] = firstDefinedEntry(exp);
        return this.translateAs(childKey, childExp);
    }

    $at(exp: DataMappedExpTypes<any>["$at"]): U {
        const [key, subExp] = firstDefinedEntry(exp);
        return this.translateAt(<any>key, subExp)
    }

    $isNull(exp: DataMappedExpTypes<T>['$isNull']): U {
        return this.translateIsNull(false, this.translate(exp));
    }

    $isNotNull(exp: DataMappedExpTypes<T>['$isNotNull']): U {
        return this.translateIsNull(true, this.translate(exp));
    }

    abstract translateIfNull(exp: U, alt_value: U): U;

    $ifNull([left, _else]: DataMappedExpTypes<T>['$ifNull']): U {
        return this.translateIfNull(
            this.translate(left),
            this.translate(_else)
        )
    }

    $concat(exp: DataMappedExpTypes<T>["$concat"]): U {
        return this.translateConcat(exp.map(exp => this.translate(exp)));
    }

    $count(exp: DataMappedExpTypes<T>["$count"]): U {
        if (typeof exp === "string") {
            return this.translateCount(exp, undefined);
        } else if (typeof exp === "object") {
            const [propertyName, subExp] = firstDefinedEntry(exp)
            return this.translateCount(propertyName, subExp);
        }
        throw new TypeError()
    }


    abstract translateHas(
        inverse: boolean,
        propertyName: string,
        exp: DataExp<any>
    ): U;

    $has(exp: DataMappedExpTypes<T>["$has"], inverse = false): U {
        if (typeof exp === "string") {
            return this.translateHas(inverse, exp, undefined)
        } else if (typeof exp === "object") {
            const [propertyName, subExp] = firstDefinedEntry(exp)
            return this.translateHas(inverse, propertyName, subExp);
        }
        throw new TypeError(`Invalid "has" Exp`)
    }

    // TODO: translateHas(inverse, ...
    $notHas(exp: DataMappedExpTypes<T>["$has"]): U {
        return this.$has(exp, true)
    }

    $search(exp: DataMappedExpTypes<T>["$search"]): U {
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
                    {$parameter: word}
                ])
        });
    }

    $parameter(exp: DataMappedExpTypes<T>["$parameter"]): U {
        return this.translateParameter(exp);
    }


    $join<K>([exps, sep]: DataMappedExpTypes<T>["$join"]): U {
        const $concat: DataExp<T>[] = [];
        for (const [index, exp] of exps.entries()) {
            if (index)
                $concat.push({$parameter: sep})
            $concat.push(exp);
        }
        return this.translate({$concat});
    }


    $not<K>(exp: DataMappedExpTypes<T>["$not"]): U {
        if (exp && (typeof exp === "object") && ('$not' in exp))
            return this.translate(exp.$not);
        return this.translateNot(this.translate(exp))
    }

    abstract translateIf(condition: U,
                         then: U,
                         _else: U): U;

    $if<K>(exp: DataMappedExpTypes<T>["$if"]): U {
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

    $case(cases: DataMappedExpTypes<T>['$case']): U {
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

