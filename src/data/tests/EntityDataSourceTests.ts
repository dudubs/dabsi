import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../acl/User";
import {useQueryBuilderExp} from "../../typeorm/exp/useQueryBuilderExp";
import {EntityDataSource} from "../EntityDataSource";
import {
    DataSourceTester,
    defineDataSourceTests,
    TestCommentData,
    TestMovieData,
    TestMsgData
} from "./defineDataSourceTests";
import {TestConnection} from "./TestConnection";

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

    users = new EntityDataSource(User, {
        connection: this.connection
    })


}

defineDataSourceTests(() => new EntityDataSourceTests());
