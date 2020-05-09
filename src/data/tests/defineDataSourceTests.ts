import {User} from "../../acl/User";
import {JSONFields} from "../../json-exp/JSONExp";
import {DataSource} from "../DataSource";
import objectContaining = jasmine.objectContaining;

export type TestCommentData = {
    text: string,

    msg: TestMsgData;
};

export type TestMsgData = {
    text: string;

    comments: TestCommentData[];

};


export type TestMovieData = {
    year: number;

    name: string;
};

export abstract class DataSourceTester {

    abstract movies: DataSource<TestMovieData>;

    abstract msgs: DataSource<TestMsgData>;

    abstract comments: DataSource<TestCommentData>;

    abstract users: DataSource<User>;
}


export function defineDataSourceTests(
    getTester: () => DataSourceTester
) {

    const tester = getTester();


    it('relation of', async () => {
        const msgId = await tester.msgs.insert({
            text: "msg1"
        });

        expect(await tester.msgs.get(msgId, {
            countComments: {$count: "comments"}
        })).toEqual(objectContaining({
            countComments: 0
        }));

        const commentIdAtMsg = await tester.msgs.at("comments", msgId).insert({
            text: "hello"
        });

        const commentIdOfMsg = await tester.comments.of("msg", msgId).insert({
            text: "world"
        });

        expect(await tester.msgs.get(msgId, {
            countComments: {$count: "comments"}
        })).toEqual(objectContaining({
            countComments: 2
        }));

        const newMsgId = await tester.msgs.insert({
            text: "msg2"
        });

        await tester.msgs.of("comments", commentIdAtMsg).insert({
            text: "newComment"
        });

        await tester.comments.at("msg", commentIdAtMsg).insert({
            text: "msg4"
        });

    })

    it('', async () => {

        await tester.movies.insert({year: 1992, name: "NotTitanic"});
        const id = await tester.movies.insert({year: 1992, name: "Titanic"});

        expect(await tester.movies.get(id,
            JSONFields("year", "name"))).toEqual(objectContaining({
            year: 1992,
            name: "Titanic"
        }));

        await tester.movies.update(id, {
            year: 1999
        })

    });

    it('', () => {


    })

}


