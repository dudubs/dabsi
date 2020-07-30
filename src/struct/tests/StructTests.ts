import {RandomId} from "../../common/patterns/RandomId";
import {createStruct} from "../createStruct";
import {Default} from "../Default";
import {Field} from "../Field";
import {hasFields} from "../hasFields";
import {MinLength} from "../MinLength";
import {Optional} from "../Optional";


describe('createStruct', () => {

    const A = createClass()

    it('expect DBase have fields', () => {
        expect(hasFields(A)).toBeTruthy();
    })


    it('expect DBase.xs create empty string', () => {

        expect(createStruct(createClass(Optional())))
            .toEqual(<any>{});

        expect(() => createStruct(createClass()))
            .toThrow()

        expect(createStruct(createClass(Default(() => ""))))
            .toEqual(<any>{xs: ""});
        expect(createStruct(createClass(), {xs: "hello"}))
            .toEqual(jasmine.objectContaining({xs: "hello"}));
    });

    it('expected string', () => {
        expect(() => createStruct(A, <any>{xs: 123}))
            .toThrow()
    })


    it('expected to min-length', () => {
        expect(() => createStruct(createClass(MinLength(2)), {
            xs: "1"
        })).toThrow()
        expect(() => createStruct(createClass(MinLength(2)), {
            xs: "12"
        })).not.toThrow()
    });

    it('expect to random-id', () => {
        const A = createClass(Default(RandomId));
        expect(createStruct(A).xs)
            .not.toEqual(createStruct(A).xs);
    });


    function createClass(...decorators) {
        class A {
            @((target, key) => {
                Field()(target, key);
                decorators.forEach(decorator => {
                    decorator(target, key);
                })
            }) xs: string;
        }

        return A;
    }
})
