import {focusNextTest} from "../../typeorm/exp/tests/focusNextTest";
import {DataSelection} from "../DataSelection";


testm(__filename, () => {

    describe('merge', () => {
        const sOmitAll = {
            omit: "all",
            fields: {x: 1}
        };

        const sPickKeys = {
            pick: ["z", "x"],
            fields: {x: 1}
        };
        const sPickAll = {
            fields: {x: 1}
        };

        test('omit-all and omit-all', sOmitAll, {omit: "all", fields: {y: 1}}, s => {
            expect(s.omit).toEqual("all");
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });

        test('omit-all and omit-keys', sOmitAll, {omit: ["x", "z"], fields: {y: 1}}, s => {
            expect(s.omit).toEqual("all");
            expect(s.fields).toEqual({
                y: jasmine.anything(),
            })
        });

        test('omit-all and pick-all', sOmitAll, {fields: {y: 1}}, s => {
            expect(s.omit).toEqual("all");
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });
        const sOmitKeys = {
            omit: ["z", "u"],
            fields: {
                x: 1,
                a: 1
            },
        };




        test('omit-keys and omit-all', sOmitKeys, {omit: "all", fields: {y: 1}}, s => {
            expect(s.omit).toEqual("all");
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });

        test('omit-keys and omit-keys', sOmitKeys, {omit: ["x", "z"], fields: {y: 1}}, s => {
            expect(s.omit).toEqual(["z", "u", "x"]);
            expect(s.fields).toEqual({
                y: jasmine.anything(),
                a: jasmine.anything()
            })
        });

        test('omit-keys and pick-all', sOmitKeys, {fields: {y: 1}}, s => {
            expect(s.omit).toEqual(["z", "u"]);
            expect(s.fields).toEqual({
                y: jasmine.anything(),
                a: jasmine.anything(),
                x: jasmine.anything()
            })
        });


        test('omit-keys and pick-keys', sOmitKeys, {pick: ["x", "z"],
            fields: {y: 1}}, s => {
            expect(s.omit).toEqual(["u"]);
            expect(s.fields).toEqual({
                x: jasmine.anything(),
                y: jasmine.anything(),
            })
        });

        test('pick-keys and omit-all', sPickKeys, {omit: "all", fields: {y: 1}}, s => {
            expect(s.omit).toEqual("all");
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });

        test('pick-keys and omit-keys', sPickKeys, {omit: ["x", "z"], fields: {y: 1}}, s => {
            expect(s.omit).toEqual(["x", "z"]);
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });

        test('pick-keys and pick-all', sPickKeys, {fields: {y: 1}}, s => {
            expect(s.pick).toEqual(["z", "x"]);
            expect(s.fields).toEqual({
                x: jasmine.anything(),
                y: jasmine.anything()
            })
        });

        test('pick-all and omit-all', sPickAll, {omit: "all", fields: {y: 1}}, s => {
            expect(s.omit).toEqual("all");
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });

        test('pick-all and omit-keys', sPickAll, {omit: ["x", "z"], fields: {y: 1}}, s => {
            expect(s.omit).toEqual(["x", "z"]);
            expect(s.fields).toEqual({
                y: jasmine.anything()
            })
        });

        test('pick-all and pick-all', sPickAll, {fields: {y: 1}}, s => {
            expect(s.pick).toBeUndefined()
            expect(s.omit).toBeUndefined()
            expect(s.fields).toEqual({
                x: jasmine.anything(),
                y: jasmine.anything()
            })
        });

        function test(title, a, b, callback: (s) => void) {
            it(title, () => {
                callback(DataSelection.merge(a, b))
            })

        }

    });

})
