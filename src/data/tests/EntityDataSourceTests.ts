import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../../acl/User";
import {useQueryBuilderExp} from "../../typeorm/exp/useQueryBuilderExp";
import {EntityDataSource} from "../EntityDataSource";
import {DataSourceTester, TestCommentData, TestMovieData, TestMsgData, TestMsgTitleData} from "./dataSourceTests";
import {TestConnection} from "./TestConnection";

useQueryBuilderExp();

@Entity()
export class TestMsgTitle implements TestMsgTitleData {

    @PrimaryGeneratedColumn()
    msgTitleId: number;

    @Column()
    text: string;

    @OneToOne(() => TestMsg, msg => msg.title)
    @JoinColumn()
    msg: InstanceType<typeof TestMsg>;


}

@Entity()
export class TestMsg implements TestMsgData {

    @PrimaryGeneratedColumn()
    msgId: number;

    @Column()
    text: string;

    @OneToMany(() => TestComment, comment => comment.msg)
    comments: TestComment[];

    @OneToOne(() => TestMsgTitle, title => title.msg)
    title: TestMsgTitle;
}

@Entity()
export class TestComment implements TestCommentData {

    @PrimaryGeneratedColumn()
    commentId: number;

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


export class EntityDataSourceTester extends DataSourceTester {

    connection = TestConnection([
        TestMovie,
        TestComment,
        TestMsg,
        TestMsgTitle
    ]);

    movies = new EntityDataSource(TestMovie, {
        connection: this.connection
    });

    msgs = new EntityDataSource(TestMsg as new () => TestMsgData, {
        connection: this.connection
    });


    msgsTitles = new EntityDataSource(TestMsgTitle as new () => TestMsgTitleData, {
        connection: this.connection
    });

    comments = new EntityDataSource(TestComment as new() => TestCommentData, {
        connection: this.connection
    });

    users = new EntityDataSource(User, {
        connection: this.connection
    })


}

// DataSourceTests(() => new EntityDataSourceTester());

// one-to-one owner


const tester = new EntityDataSourceTester();


// function join(
//     qb: SelectQueryBuilder<any>,
//     relation: Relation<any, any>,
//     ownerId: object | undefined) {
//
//     const rightSchema = `_${relation.rightMetadata.tableName}_${relation.propertyName}${
//         ownerId ? '_' + WeakId(ownerId) : ''
//     }`;
//
//     const rightParameter = rightSchema + '_';
//
//     const leftIsOwner = relation.relationMetadata.isOwning;
//
//
//     const [leftColumn, rightColumn] = reverseIf(leftIsOwner,
//         (c: ColumnMetadata) => c,
//         (c: ColumnMetadata) => definedAt(c, "referencedColumn"));
//
//
//     if (relation.relationMetadata.isOneToOne) {
//         return joinOneToOne();
//     }
//
//     // const [leftScehma, rightSchema] = reverseIf(leftIsOwner, qb.alias, rightSchema);
//
//     return qb;
//
//     function joinManyToMany() {
//
//         const joinSchema = rightSchema + 'Join';
//
//         const [leftJoinColumns, rightJoinColumns] = reverseIf(leftIsOwner,
//             relation.ownerRelationMetadata.joinColumns,
//             relation.ownerRelationMetadata.inverseJoinColumns)
//
//         qb.innerJoin(relation.ownerRelationMetadata.joinTableName, joinSchema,
//             leftJoinColumns
//                 .map(c => `${joinSchema}.${leftColumn(c)}=${joinSchema}.${leftColumn(c)}`)
//                 .join(' AND ')
//         );
//
//         // qb.leftJoin(relation.ownerType, ownerSchema,
//         //     relation.ownerMetadata)
//     }
//
//     function side(isLeft, left, right) {
//         return isLeft ? left : right
//     }
//
//     function joinOneToOne() {
//
//         let joinCondition = '1';
//
//         if (leftIsOwner) {
//             joinCondition = relation.ownerRelationMetadata.joinColumns
//                 .map(c => `${qb.alias}.${c.databaseName}=${
//                     rightSchema}.${c.referencedColumn?.databaseName}`)
//                 .join(' AND ');
//         } else {
//             joinCondition = relation.ownerRelationMetadata.joinColumns
//                 .map(c => `${qb.alias}.${c.referencedColumn?.databaseName}=${
//                     rightSchema}.${c.databaseName}`)
//                 .join(' AND ');
//         }
//
//         if (ownerId) {
//
//             for (let c of relation.rightMetadata.primaryColumns) {
//                 qb.setParameter(rightParameter + c.propertyName,
//                     ownerId[c.propertyName])
//             }
//             qb.innerJoin(relation.rightType, rightSchema, `${joinCondition} AND ${
//                 relation.rightMetadata.primaryColumns
//                     .map(c => `${rightSchema}.${rightColumn(c).databaseName}=:${
//                         rightParameter + c.propertyName}`)
//                     .join(' AND ')
//             }`);
//
//         } else {
//             qb.leftJoin(relation.rightType, rightSchema, joinCondition);
//         }
//
//         return qb;
//     }
//
//
// }
