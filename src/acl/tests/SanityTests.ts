import {EntityDataSource} from "../../data/EntityDataSource";
import {TestConnection} from "../../data/tests/TestConnection";
import {Group} from "../Group";
import {User} from "../User";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;


const connection = TestConnection([
    User,
    Group
]);

const Users = EntityDataSource.create(User, {connection});
const Groups = EntityDataSource.create(Group, {connection});

let g1: string;
let g2: string;
let u1: string;
let u2: string;
let u3: string;

beforeAll(async () => {
    [g1, g2] = [
        await Groups.insert({}),
        await Groups.insert({}),
    ];
    [u1, u2, u3] = [
        await Users.insert({}),
        await Users.insert({}),
        await Users.insert({})
    ];

    await Groups.at("users", g1).add([u1, u2]);
    items = (await Groups
        .extend({
            u1InGroup: {$has: {users: {$is: u1}}},
            u2InGroup: {$has: {users: {$is: u2}}},
            u3InGroup: {$has: {users: {$is: u3}}},
        })
        .query({})).items
});

let items: any;

it('$is', async () => {
    const result = await Users.query({filter: {$is: [u1, u2]}});
    expect(result).toEqual(objectContaining({
        items: arrayContaining([
            objectContaining({key: u1}),
            objectContaining({key: u2}),
        ])
    }));

    expect(result).not.toEqual(objectContaining({
        items: arrayContaining([
            objectContaining({key: u3}),
        ])
    }));
})

function assert(g: string, u: "u1" | "u2" | "u3", exists: boolean) {
    expect(items).toEqual(arrayContaining([
        objectContaining({
            key: g, row: objectContaining({
                [u + "InGroup"]: exists ? jasmine.truthy() : jasmine.falsy()
            })
        })
    ]))
}

it('tryUndefined u1 in g1', () => assert(g1, "u1", true));

it('tryUndefined u2 in g1', () => assert(g1, "u2", true));

it('tryUndefined u3 not in g1', () => assert(g1, "u3", false));

it('tryUndefined u2 not in g2', () => assert(g2, "u2", false));

it('tryUndefined u3 not in g2', () => assert(g2, "u3", false));
