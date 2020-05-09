import {Entity, PrimaryGeneratedColumn} from "typeorm";
import {decorateDesignType} from "../../reflect/decorateDesignType";
import {createTestConnection} from "./TestConnection";



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
