import {User} from "../../acl/User";
import {DataSource} from "../DataSource";
import objectContaining = jasmine.objectContaining;

export type TestCommentData = {
    text: string,

    msg: TestMsgData;
};

export type TestMsgTitleData = {
    text: string;

    msg: TestMsgData;
};

export type TestMsgData = {
    text: string;

    comments: TestCommentData[];

    title: TestMsgTitleData;
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


export function DataSourceTests(
    getTester: () => DataSourceTester
) {

    const tester = getTester();


    it('one-to-one sanity', async () => {
        // const msgId = await tester.msgs.insert({text: "first"});
        // console.log('--------- start');
        // await tester.msgs.at("title", msgId).insert({text: "first title"});
        // console.log('--------- end');
    })

    it('sanity', async () => {

        const firstMsg = await saveMsg("first");

        const secondMsg = await saveMsg("second");

        function getMsgCountComments(msgId) {
            return tester.msgs.select({countComments: {$count: "comments"}}).get(msgId)
                .then(row => row.countComments)
        }

        async function saveMsg(text) {
            console.log({msgText: text});
            const msgId = await tester.msgs.insert({text});
            expect(await getMsgCountComments(msgId)).toEqual(0);
            const commentIdByMsgs = await
                tester.msgs.at("comments", msgId).insert({text: `${text} comment by msgs`});

            const commentIdByComments = await
                tester.comments.of("msg", msgId).insert({text: `${text} comment by comment`});

            await tester.msgs.at("title", msgId).insert({
                text: text + " title"
            })

            expect(await getMsgCountComments(msgId)).toEqual(2);

            expect(await tester.comments.at("msg", commentIdByMsgs).get())
                .toEqual(objectContaining({text}));

            expect(await tester.comments.at("msg", commentIdByComments).get())
                .toEqual(objectContaining({text}));

            expect(await tester.msgs.at("comments", msgId).get())
                .toEqual(objectContaining({
                    text: jasmine.stringMatching(text)
                }))
            return {id: msgId, commentIdByMsgs, commentIdByComments}
        }
    })

    it('expect to update primary columns', async () => {

        await tester.movies.insert({year: 1992, name: "NotTitanic"});
        const id = await tester.movies.insert({year: 1992, name: "Titanic"});

        expect(await tester.movies.select(["year", "name"]).get(id))
            .toEqual(objectContaining({year: 1992, name: "Titanic"}));

        await tester.movies.update(id, {year: 1999})

    });

    it('', () => {


    })

}


