import {
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    SelectQueryBuilder
} from "typeorm";
import {Relation, RelationAt, RelationOf} from "./Relation";
import {TestConnection} from "./TestConnection";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;


@Entity()
class A {

    @PrimaryGeneratedColumn()
    a_id: number;

    @OneToOne(() => B, b => b.a)
    @JoinColumn()
    bOwner: object & B;

    @OneToOne(() => B, b => b.aOwner)
    b: object & B;

    @ManyToMany(() => B, b => b.manyBToManyA)
    @JoinTable()
    manyAToManyBOwner: B[];

    @ManyToMany(() => B, b => b.manyBToManyAOwner)
    manyAToManyB: B[];

    @OneToMany(() => B, b => b.manyBToOneA)
    oneAToManyB: B[];

    @ManyToOne(() => B, b => b.oneBToManyA)
    manyAToOneB: object & B;
}

@Entity()
class B {

    @PrimaryGeneratedColumn()
    b_id: number;

    @OneToOne(() => A, a => a.bOwner)
    a: A;

    @OneToOne(() => A, a => a.b)
    @JoinColumn()
    aOwner: A;

    @ManyToMany(() => A, a => a.manyAToManyBOwner)
    manyBToManyA: A[];

    @ManyToMany(() => A, a => a.manyAToManyB)
    @JoinTable()
    manyBToManyAOwner: A[];

    @ManyToOne(() => A, a => a.oneAToManyB)
    manyBToOneA: A;

    @OneToOne(() => A, a => a.manyAToOneB)
    oneBToManyA: A[];
}

const getConnection = TestConnection([
    A, B
]);

function join<T>(relation: Relation<T, any>,
                 leftQb: SelectQueryBuilder<T>) {

    const debug = true;

    const rightSchema = debug ? '_right' : `${
        relation.left.entityMetadata.tableName
    }_${
        relation.propertyName
    }_${relation.right.entityMetadata.tableName}`;

    if (relation.relationMetadata.isOneToOne) {
        return joinOneToOne();
    }

    if (relation.relationMetadata.isManyToMany) {
        // return joinManyToMany()
    }

    function joinManyToMany() {
        const joinSchema = debug ? "_join" : rightSchema + '_join';
        // if (!relation.left.isOwning) return;
        if (relation.left.isOwning) return;

        leftQb.innerJoin(relation.ownerRelationMetadata.joinTableName,
            joinSchema,
            relation.left.joinColumns.map(c => `${
                leftQb.alias}.${relation.left.joinColumn(c).databaseName
            }=${
                joinSchema}.${relation.right.joinColumn(c).databaseName
            }`)
                .join(' AND ')
        )
        // .innerJoin(relation.right.entityMetadata.tableName, rightSchema,
        //     relation.right.joinColumns.map(c => `${
        //         joinSchema}.${relation.right.joinColumn(c).databaseName
        //     }=${
        //         rightSchema}.${relation.right.joinColumn(c).databaseName
        //     }`)
        //         .join(' AND ')
        // )
    }

    function joinOneToOne() {
        leftQb.innerJoin(relation.right.entityType, rightSchema,
            relation.ownerRelationMetadata.joinColumns
                .map(c => `${leftQb.alias}.${relation.left.column(c).databaseName}=${rightSchema}.${
                    relation.right.column(c).databaseName
                }`)
                .join(' AND ')
        )
    }

}

fit('one-to-one sanity', async () => {

    const connection = getConnection();

    await assert(
        new RelationOf(connection, A, "bOwner"),
        new RelationOf(connection, A, "b"),
        new RelationAt(connection, A, "bOwner"),
        new RelationAt(connection, A, "b")
    );


    await assertManyToMany(
        new RelationOf(connection, A, "manyAToManyBOwner"),
        new RelationOf(connection, A, "manyAToManyB"),
        new RelationAt(connection, A, "manyAToManyBOwner"),
        new RelationAt(connection, A, "manyAToManyB")
    );


    async function assertManyToMany(aOfBOwner: Relation<any, any>, aOfB, bOwnerAtA, bAtA) {


        console.log(aOfBOwner.right.joinColumns.map(c => [
            c.databaseName,
            c.referencedColumn?.databaseName
        ]));
        expect(aOfBOwner.right.joinColumns).toEqual(arrayContaining([
            objectContaining({
                databaseName: "bBId",
                // referencedColumn: objectContaining({
                //     databaseName: "b_id"
                // })
            })
        ]))
        expect(aOfBOwner).toEqual(objectContaining({
            left: objectContaining({
                isOwning: true,
                joinColumns: arrayContaining([
                    objectContaining({
                        databaseName: "aAId",
                        referencedColumn: objectContaining({
                            databaseName: "a_id"
                        })
                    })
                ])
            }),
        }))

        await assert(aOfBOwner, aOfB, bOwnerAtA, bAtA);
    }

    async function assert(aOfBOwner, aOfB, bOwnerAtA, bAtA) {
        expect(aOfBOwner).toEqual(objectContaining({
            left: objectContaining({entityType: A, isOwning: true}),
            right: objectContaining({entityType: B, isOwning: false}),
        }));

        expect(aOfB).toEqual(objectContaining({
            left: objectContaining({entityType: A, isOwning: false}),
            right: objectContaining({entityType: B, isOwning: true}),
        }));

        expect(bOwnerAtA).toEqual(objectContaining({
            left: objectContaining({entityType: B, isOwning: false}),
            right: objectContaining({entityType: A, isOwning: true}),
        }));

        expect(bAtA).toEqual(objectContaining({
            left: objectContaining({entityType: B, isOwning: true}),
            right: objectContaining({entityType: A, isOwning: false}),
        }));

        await assert(aOfBOwner);
        await assert(aOfB);
        await assert(bAtA);
        await assert(bOwnerAtA);


        async function assert(relation: Relation<any, any>) {
            const qb = relation.createQueryBuilder().select('1');
            join(relation, qb);
            console.log(qb.getQuery());
            await qb.getOne();
        }
    }


})
