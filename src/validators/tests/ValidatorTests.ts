import {inspect} from "util";
import {$array} from "../ArrayValidator";
import {$number} from "../NumberValidator";
import {$object} from "../ObjectValidator";
import {$optional} from "../OptionalValidator";
import {$string} from "../StringValidator";


import {Validator} from "../Validator";

testValidator($number({min: 5, max: 10}), {
    valid: [5, 6, 9, 10],
    invalid: [11, 12, 4, 3, "5"]
});

testValidator($string({length: {min: 1, max: 3}}), {
    valid: ["h"],
    invalid: ["hello"]
});
testValidator($string({pattern: /^[a-z]*$/}), {
    valid: ["hello"],
    invalid: ["Hello"]
});
testValidator($array({length: {min: 1, max: 3}, of: $number}), {
    valid: [[1], [1, 2, 3]],
    invalid: [[], [1, 2, 3, 4], ["1"]]
})
testValidator($array, {
    valid: [[]],
    invalid: [{}, 1, false]
});
testValidator($string, {
    valid: ["hello"],
    invalid: [{}, 1]
})
testValidator($number, {
    valid: [1, 2.3],
    invalid: [{}, "1"]
});
testValidator($object, {
    valid: [[], {}],
    invalid: [1, "hello"]
});

testValidator($object({xs: $string, xi: $optional($number)}), {
    valid: [
        {xs: "hello", xi: 1},
        {xs: "hello"}
    ],
    invalid: [{xs: 1}, {}, {xi: "1"}]
});

function testValidator(validator: Validator<any>, {valid, invalid}: {
    valid?: any[],
    invalid?: any[]
}) {

    describe(`expect ${inspect(validator)}`, () => {
        valid?.forEach(value => {
            it(`match to ${inspect(value)}`, () => {
                expect(() => Validator(validator).assert(value)).not.toThrow();
            })
        })

        invalid?.forEach(value => {
            it(`not match to ${inspect(value)}`, () => {
                expect(() => Validator(validator).assert(value)).toThrow();
            })
        })
    })

}



