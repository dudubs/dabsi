import "..";
import {DataExp} from "../../../json-exp/DataExp";
import {DataCursor, EmptyDataCursor} from "../../DataCursor";
import objectContaining = jasmine.objectContaining;

type T = {
    firstName: string,
    lastName: string,
    email: string,
    age: number
};
const fullName: DataExp<T> = {$join: [["firstName", "lastName"], " "]};

const cursor = (<DataCursor<T>>EmptyDataCursor)
    .let(cursor => DataCursor.extend(cursor, {
        fullName, isAdult: ["age", {">": 20}]
    }))

it("picking", () => {
    expect(<any>DataCursor.pick(cursor, ["email", "fullName"])).toEqual(jasmine.objectContaining({
        fields: jasmine.objectContaining({
            email: "email",
            fullName: jasmine.any(Object)
        })
    }));
});

it("omitting", () => {
    expect(<any>DataCursor.omit(cursor, ["email", "fullName"])).toEqual(jasmine.objectContaining({
        fields: jasmine.objectContaining({
            isAdult: jasmine.any(Object)
        }),
        exclude: [
            "email"
        ]
    }))
})
