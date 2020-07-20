import {subTest} from "../../jasmine/subTest";
import {AEntity, BEntity, CEntity} from "../../typeorm/relations/tests/Entities";
import {DataSource} from "../DataSource";
import {RelationKeys} from "../Relation";
import arrayContaining = jasmine.arrayContaining;

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

        function assert(p: RelationKeys<AEntity>) {

            return subTest(`(${p})`, async () => {
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
            })

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

    });

    it('of relation', async () => {
        const aKey = await ADS.insert({});
        const bOfA = BDS.of("a", aKey);
        expect(await bOfA.has()).toBeFalsy();
        await bOfA.insert({})
        expect(await bOfA.has()).toBeTruthy();
    });

    it("of column", async () => {
        const aKey = await ADS.insert({});

        const bOfA = BDS.of("a", aKey);

        const bOfAOfHello = bOfA.of("bText", "hello");
        expect(await bOfAOfHello.has()).toBeFalsy();

        const bOfAOfHelloKey = await bOfAOfHello.insert({});
        expect(await bOfAOfHello.has()).toBeTruthy();

        const bOfAOfWorld = bOfA.of("bText", "world");
        expect(await bOfAOfWorld.has()).toBeFalsy();

        const cOfbOfA = CDS.of("b", bOfAOfHelloKey);

        const cOfbOfAOfHello = cOfbOfA.of("c_text", "hello");
        expect(await cOfbOfAOfHello.has()).toBeFalsy();

        const cOfbOfAOfHelloKey = await cOfbOfAOfHello.insert({});
        expect(await cOfbOfAOfHello.has()).toBeTruthy();

        expect(await BDS
            .of("bText", "hello")
            .at("cOwner", bOfAOfHelloKey)
            .has()
        ).toBeTruthy();

        expect(await BDS
            .of("bText", "world")
            .at("cOwner", bOfAOfHelloKey)
            .has()
        ).toBeFalsy();

    })


    it('children', async () => {
        const rootKey = await ADS.insert({});
        const rootChildren = ADS.at("children", rootKey);
        expect(await rootChildren.count()).toEqual(0);

        const childKeys = [
            await ADS.insert({}),
            await ADS.insert({}),
        ]
        await rootChildren.add(childKeys);
        expect(await rootChildren.count()).toEqual(2);


        expect((await rootChildren.items()).map(child => child.$key))
            .toEqual(arrayContaining(childKeys))
    })
}

