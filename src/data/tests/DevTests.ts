import {Entity, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "../../common/typings";
import {createTestConnection} from "./TestConnection";


export function decorateDesignType<T, K extends string>(target: Type<Record<K, T>>, key: K, type: Function & Type<T>, decorators: Function[]) {

    Reflect.decorate([...<any>decorators, Reflect.metadata("design:type", type)], target.prototype, key);
}

xit('dev', async () => {


    @Entity()
    class A {

        // @PrimaryGeneratedColumn()
        id: number;

    }


    decorateDesignType(A, "id", Number, [
        PrimaryGeneratedColumn()
    ])


    const conn = await createTestConnection([A]);


    const repo = conn.getRepository(A);

    await repo.save([
        repo.create()
    ])

})
