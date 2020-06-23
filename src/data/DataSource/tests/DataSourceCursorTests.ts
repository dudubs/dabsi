import "..";
import {JSONExp} from "../../../json-exp/JSONExp";
import {DataCursor} from "../../DataCursor";
import objectContaining = jasmine.objectContaining;

type T = {
    firstName: string,
    lastName: string,
    email: string,
    age: number
};
const fullName: JSONExp<T> = {$join: [["firstName", "lastName"], " "]};

const cursor = DataCursor
    .create<T>()
    .let(cursor => DataCursor.extend(cursor, {
        fullName, isAdult: ["age", {">": 20}]
    }))

it("picking", () => {
    expect(<any>DataCursor.pick(cursor, ["email", "fullName"])).toEqual(objectContaining({
        fields: objectContaining({
            email: "email",
            fullName: jasmine.any(Object)
        })
    }));
});

it("omitting", () => {
    expect(<any>DataCursor.omit(cursor, ["email", "fullName"])).toEqual(objectContaining({
        fields: objectContaining({
            isAdult: jasmine.any(Object)
        }),
        exclude: [
            "email"
        ]
    }))
})
