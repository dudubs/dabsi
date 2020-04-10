import {StaticExpr} from "./StaticExpr";

let counter = 0;

class User {
    id = counter++;
    groups: Group[] = [];

    name = `un${this.id}`;
}

class Group {
    id = counter++;
    users: User[] = [];

    name = `gn${this.id}`;
}

function bind(u: User, ...gs: Group[]) {
    u.groups.push(...gs);
    for (let g of gs) {
        g.users.push(u);
    }
}

const [u1, u2, u3, u4] = [new User(), new User(), new User(), new User()];
const [g1, g2, g3] = [new Group(), new Group(), new Group()];

bind(u1, g1);
bind(u2, g2);
bind(u3, g1, g2, g3);
bind(u4);

fit('field', () => {
    expect(StaticExpr(u1, "name")).toEqual(u1.name);
});

fit('count', () => {
    expect(StaticExpr(u3, {count: "groups"}))
        .toEqual(3);

    expect(StaticExpr(u3, {
        count: {
            of: "groups",
            where: ["id", "equals", {value: g1.id}]
        }
    }))
        .toEqual(1);

    expect(StaticExpr(u3, {
        count: {
            of: "groups",
            where: {not: ["id", "equals", {value: g1.id}]}
        }
    }))
        .toEqual(2);
})



