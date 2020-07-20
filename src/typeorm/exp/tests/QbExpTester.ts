import {Connection, DeepPartial, ObjectType, Repository} from "typeorm";
import {Lazy} from "../../../common/patterns/lazy";
import {AnyDataUnion, DataUnion} from "../../../data/DataUnion";
import {DataExp} from "../../../json-exp/DataExp";
import {QbDataExpTranslator} from "../QbDataExpTranslator";


export class JasmineTester {
    protected _focus = false;
    protected _debug = false;

    get foucs(): this {
        this._focus = true;
        return this;
    }

    get debug(): this {
        this._debug = true;
        return this;
    }

    test(title, callback) {
        const {_debug} = this;
        this._debug = false;
        (this._focus ? fit : it)(title, async () => {
            this._debug = _debug;
            await callback();
            this._debug = false;
        });
        this._focus = false;
    }

}

export class QbExpTester<T> extends JasmineTester {
    constructor(
        public getConnection: () => Connection,
        public type: ObjectType<T> | DataUnion.AnyClass<T>
    ) {
        super();
    }

    get entityType() {
        return 'unionType' in this.type ? this.type.unionType : this.type;
    }


    @Lazy() get repository(): Repository<T> {
        return this.getConnection().getRepository(this.entityType)
    }


    get unionInfo(): AnyDataUnion | undefined {
        if ('unionType' in this.type) {
            return this.type;
        }
    }

    as<U extends T>(entityType: ObjectType<U>): QbExpTester<U> {
        return new QbExpTester(this.getConnection, entityType)
    }

    save(entries: DeepPartial<T>[]) {
        return this.repository.save(entries.map(entity => this.repository.create(entity)))
    }

    getOneRowWhereExp(exp) {
        const qb = this.repository
            .createQueryBuilder()
            .select('1');
        qb.andWhere(
            QbDataExpTranslator.translate(qb, <any>exp,
                this.unionInfo)
        );
        if (this._debug) {
            console.log(qb.getQueryAndParameters());
        }
        return qb.getRawOne();
    }


    expectToNotExists<U = T>(exp: DataExp<U>) {
        this.test(JSON.stringify(exp), async () => {
            if (await this.getOneRowWhereExp(exp)) {
                fail(`expected to not exists`)
            }
        })
    }


    expectToExists<U = T>(exp: DataExp<U>) {
        this.test(JSON.stringify(exp), async () => {
            if (!await this.getOneRowWhereExp(exp)) {
                fail(`expected to exists`)
            }
        })
    }

    expectToError<U = T>(exp: DataExp<U>) {
        this.test(JSON.stringify(exp), async () => {
            try {
                await this.getOneRowWhereExp(exp);
            } catch (e) {
                return;
            }
            fail(`expected to error.`)
        })
    }
}
