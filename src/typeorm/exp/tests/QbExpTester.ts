import {Connection, ObjectType, Repository} from "typeorm";
import {Lazy} from "../../../common/patterns/lazy";
import {DataTypeInfo} from "../../../data/DataTypeInfo";
import {DataExp} from "../../../json-exp/DataExp";
import {QbDataExpTranslator} from "../QbDataExpTranslator";


export class QbExpTester<T> {
    constructor(
        public getConnection: () => Connection,
        public type: ObjectType<T>,
    ) {

    }


    typeInfo = DataTypeInfo.get(this.type);

    @Lazy() get repository(): Repository<T> {
        return this.getConnection().getRepository(this.typeInfo.type)
    }

    getOneRowWhereExp(exp) {
        const qb = this.repository
            .createQueryBuilder()
            .select('1');
        qb.andWhere(
            new QbDataExpTranslator(
                this.typeInfo,
                qb,
                qb.alias,
                qb,
            ).translate(exp),
        );
        return qb.getRawOne();
    }


    testExp(exp, callback, onError?) {
        return it(JSON.stringify(exp), async () => {
            try {
                callback(
                    await this.getOneRowWhereExp(exp)
                );
            } catch (err) {
                if (onError) {
                    await onError(err)
                } else {
                    throw err;
                }
            }
        })
    }

    expectToNotExists(exp: DataExp<T>) {
        this.testExp(exp, (row) => {
            if (row) {
                fail(`expected to not exists`)
            }
        })
    }


    expectToExists(exp: DataExp<T>) {
        this.testExp(exp, (row) => {
            if (!row) {
                fail(`expected to exists`)
            }
        })
    }

    expectToError(exp: DataExp<T>) {
        this.testExp(exp, () => {
            fail(`expected to error.`)
        }, () => {
            ///
        })
    }
}


/*

    DogType = "dog";

 */
