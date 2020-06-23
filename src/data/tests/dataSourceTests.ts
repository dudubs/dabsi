import {ExtractKeys} from "../../common/typings";
import {AEntity, BEntity, CEntity} from "../../typeorm/relations/tests/Entities";
import {DataSource} from "../DataSource";
import {EntityDataSource} from "../EntityDataSource";

export function DataSourceTests(
    ADS: DataSource<AEntity>,
    BDS: DataSource<BEntity>,
    CDS: DataSource<CEntity>
) {

    it('relations sanity', async () => {
        const debug = false;

        const aKey = await ADS.insert({});
        const bKey = await BDS.insert({});

        expect(await ADS.get(aKey)).toBeTruthy();
        expect(await ADS.get(bKey)).toBeFalsy();
        expect(await BDS.get(bKey)).toBeTruthy();

        await assert("b");
        await assert("bOwner");

        await assert("manyAToManyB");
        await assert("manyAToManyBOwner");

        await assert("oneAToManyB");
        await assert("manyAToOneB");

        async function assert(p: ExtractKeys<AEntity, object>) {

            debug && console.log({p, aKey, bKey});
            const aOfBOwner = ADS.of(p, bKey);
            const bOwnerAtA = ADS.at(p, aKey);


            await assert(aOfBOwner, aKey, bOwnerAtA);
            await assert(bOwnerAtA, bKey, aOfBOwner);

            async function assert<T, U>(ds: DataSource<T>,
                                        key: string,
                                        inverseDs: DataSource<U>) {

                expect(await ds.get()).toBeFalsy();
                expect(await inverseDs.get()).toBeFalsy();

                await ds.add(key);
                expect(await ds.get()).toBeTruthy();
                expect(await inverseDs.get()).toBeTruthy();

                await ds.remove(key);
                expect(await ds.get()).toBeFalsy();
                expect(await inverseDs.get()).toBeFalsy();


            }
        }
    })

    it('insert relations', async () => {
        const aKey = await ADS.insert({});
        const cKey = await CDS.insert({});
        const cKey2 = await CDS.insert({});

        const bOfAOwnerOfCOwner = BDS
            .of("aOwner", aKey)
            .of("cOwner", cKey);

        expect(await bOfAOwnerOfCOwner.get()).toBeFalsy();
        await bOfAOwnerOfCOwner.insert({});
        expect(await bOfAOwnerOfCOwner.get()).toBeTruthy();
        expect(await BDS.of("aOwner", aKey).get()).toBeTruthy();
        expect(await BDS
            .of("aOwner", aKey)
            .of("cOwner", cKey2).get()).toBeFalsy();

        const bKey = await BDS.insert({});
        const bAtAOwnerOfCOwner = BDS
            .at("aOwner", bKey)
            .of("cOwner", cKey);

        expect(await bAtAOwnerOfCOwner.get()).toBeFalsy();
        await bAtAOwnerOfCOwner.insert({});
        expect(await bAtAOwnerOfCOwner.get()).toBeTruthy();
        expect(await BDS
            .at("aOwner", bKey)
            .of("cOwner", cKey2).get()).toBeFalsy()

    })

    it('deep relation sanity', async () => {

        await ADS
            .at("bOwner", "aid1")
            .at("cOwner", "bid2")
            .at("b", "cid3")
            .at("a", "bid4")
            .of("b", "bid5")
            .of("cOwner", "cid6")
            .at("bOwner", "aid7")
            .at("cOwner", "bid8")
            .get();

    })

}
