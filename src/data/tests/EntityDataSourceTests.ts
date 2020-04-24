import {
    Column,
    Entity,
    getMetadataArgsStorage,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {useQueryBuilderExp} from "../../typeorm/exp/useQueryBuilderExp";
import {EntityDataSource} from "../EntityDataSource";
import {
    DataSourceTester,
    defineDataSourceTests,
    TestCommentData,
    TestMovieData,
    TestMsgData
} from "./defineDataSourceTests";
import {createTestConnection, TestConnection} from "./TestConnection";

useQueryBuilderExp();


@Entity()
export class TestMsg implements TestMsgData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @OneToMany(() => TestComment, comment => comment.msg)
    comments: TestComment[];
}

@Entity()
export class TestComment implements TestCommentData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => TestMsg, msg => msg.comments)
    msg: TestMsg;

}

@Entity()
export class TestMovie implements TestMovieData {

    @PrimaryColumn()
    year: number;

    @PrimaryColumn()
    name: string;

}

it('', async () => {
    const conn = await createTestConnection([TestMovie])
    const repo = conn.getRepository(TestMovie);

    const qb = repo.createQueryBuilder();

    qb.expressionMap.selects.length = 0;
    qb.expressionMap.selects.push({
        selection: "year",
        aliasName: "id2"
    }, {
        selection: "year",
        aliasName: "id3"
    })
    console.log(await
        qb.getQuery()
    );

    console.log(
        getMetadataArgsStorage().filterColumns(TestMsg)
            .filter(f => f.options.primary)
    );

})


export class EntityDataSourceTests extends DataSourceTester {

    connection = TestConnection([
        TestMovie,
        TestComment,
        TestMsg
    ]);

    movies = EntityDataSource.create(TestMovie, {
        connection: this.connection
    });

    msgs = EntityDataSource.create(TestMsg as new () => TestMsgData, {
        connection: this.connection
    });

    comments = EntityDataSource.create(TestComment as new() => TestCommentData, {
        connection: this.connection
    });


}

defineDataSourceTests(() => new EntityDataSourceTests());
