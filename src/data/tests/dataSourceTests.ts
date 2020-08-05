import {subTest} from "../../jasmine/subTest";
import {AEntity, BEntity, CEntity} from "../../typeorm/relations/tests/Entities";
import {DataSource} from "../DataSource";
import {RelationKeys} from "../Relation";
import {DUnion, EUnion} from "./BaseEntities";
import arrayContaining = jasmine.arrayContaining;

export function DataSourceTests(
    ADS: DataSource<AEntity>,
    BDS: DataSource<BEntity>,
    CDS: DataSource<CEntity>,
    DDS: DataSource<DUnion>,
    EDS: DataSource<EUnion>
) {


    it('relations sanity', async () => {
        const debug = false;

        const aKey = await ADS.insert({});
        const bKey = await BDS.insert({});

        expect(await ADS.get(aKey)).toBeTruthy();
        expect(await ADS.get(bKey)).toBeFalsy();
        expect(await BDS.get(bKey)).toBeTruthy();
        await assert("oneAToOneB");
        await assert("oneAToOneBOwner");

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



    it('insert to relations', async () => {
        const aKey = await ADS.insert({});
        const cKey = await CDS.insert({});
        const cKey2 = await CDS.insert({});

        const bOfAOwnerOfCOwner = BDS
            .of("oneBToOneAOwner", aKey)
            .of("oneBToOneCOwner", cKey);

        expect(await bOfAOwnerOfCOwner.get()).toBeFalsy();
        await bOfAOwnerOfCOwner.insert({});
        expect(await bOfAOwnerOfCOwner.get()).toBeTruthy();

        expect(await BDS.of("oneBToOneAOwner", aKey).get()).toBeTruthy();


        expect(await BDS
            .of("oneBToOneAOwner", aKey)
            .of("oneBToOneCOwner", cKey2).get()).toBeFalsy();

        const bKey = await BDS.insert({});

        const bAtAOwnerOfCOwner = BDS
            .at("oneBToOneAOwner", bKey)
            .of("oneAToOneCOwner", cKey);

        ///
        expect(await bAtAOwnerOfCOwner.get()).toBeFalsy();

        await bAtAOwnerOfCOwner.insert({});
        expect(await bAtAOwnerOfCOwner.get()).toBeTruthy();
        expect(await BDS
            .at("oneBToOneAOwner", bKey)
            .of("oneAToOneCOwner", cKey2).get()).toBeFalsy()

    })

    it('deep relation sanity', async () => {

        await ADS
            .at("oneAToOneBOwner", "aid1")
            .at("oneBToOneCOwner", "bid2")
            .at("oneCToOneB", "cid3")
            .at("oneBToOneA", "bid4")
            .of("oneAToOneB", "bid5")
            .of("oneAToOneCOwner", "cid6")
            .at("oneAToOneBOwner", "aid7")
            .at("oneBToOneCOwner", "bid8")
            .get();

    });

    it('of relation key', async () => {
        const aKey = await ADS.insert({});
        const bOfA = BDS.of("oneBToOneA", aKey);
        expect(await bOfA.has()).toBeFalsy();
        await bOfA.insert({})
        expect(await bOfA.has()).toBeTruthy();
    });

    it("of data key", async () => {
        const aKey = await ADS.insert({});

        const bOfA = BDS.of("oneBToOneA", aKey);


        const bOfAOfHello = bOfA.of("bText", "bHello");
        expect(await bOfAOfHello.has()).toBeFalsy();

        const bOfAOfHelloKey = await bOfAOfHello.insert({});
        expect(await bOfAOfHello.has()).toBeTruthy();

        const bOfAOfWorld = bOfA.of("bText", "bWorld");
        expect(await bOfAOfWorld.has()).toBeFalsy();

        const cOfbOfA = CDS.of("oneCToOneB", bOfAOfHelloKey);

        const cOfbOfAOfHello = cOfbOfA.of("cText", "cHello");
        expect(await cOfbOfAOfHello.has()).toBeFalsy();

        const cOfbOfAOfHelloKey = await cOfbOfAOfHello.insert({});


        expect(await cOfbOfAOfHello.has()).toBeTruthy();

        expect(await BDS
            .of("bText", "bHello")
            .at("oneBToOneCOwner", bOfAOfHelloKey)
            .has()
        ).toBeTruthy();

        expect(await BDS
            .of("bText", "bWorld")
            .at("oneBToOneCOwner", bOfAOfHelloKey)
            .has()
        ).toBeFalsy();

    })

    it('children', async () => {
        const rootKey = await ADS.insert({});
        const rootChildren = ADS.at("manyAToManyA", rootKey);
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

