import {Connection} from "typeorm";
import {Type} from "../../../common/typings";
import {JasmineTester} from "../../../typeorm/exp/tests/JasmineTester";
import {DataSelection} from "../../DataSelection";
import {QueryBuilderSelector} from "../QueryBuilderSelector";
import {EntityDataSelector} from "./EntityDataSelector";

export class EntityDataSelectorTester<T> extends JasmineTester {

    constructor(
        public getConnection: () => Connection,
        public selection: DataSelection<any>,
        public typeOrUnion: Type<T>
    ) {
        super();
    }

    testSelection(selection: DataSelection<T>,
                  callback: (tester: EntityDataSelectorTester<T>) => void) {


        callback(
            new EntityDataSelectorTester(
                this.getConnection,
                selection,
                this.typeOrUnion
            ))


    }

    protected entityType: any = undefined;

    ofEntityType<T>(entityType: Type<T>): EntityDataSelectorTester<T> {
        this.entityType = entityType;
        return <any>this.describe(`of ${entityType.name}`);
    }

    test(callback) {
        super.test(callback);
        this.entityType = undefined;
    }

    testRow(callback: (row: T) => void) {
        const entityType = this.entityType ?? this.typeOrUnion;
        const {debugging} = this;
        this.test(async () => {
            const qb = this.getConnection()
                .getRepository(entityType)
                .createQueryBuilder()
                .take(1);

            if (debugging)
                console.log(qb.getQueryAndParameters());

            const selector = new QueryBuilderSelector(qb);
            const loader = EntityDataSelector
                .select(this.typeOrUnion, qb, selector, this.selection,
                    qb.alias, 'r_');
            const [row] = await loader.loadMany();
            await callback(row);
        });
        return this;
    }
}
