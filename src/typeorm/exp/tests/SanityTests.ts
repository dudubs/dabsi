import {AEntity, BEntity, getABCTestConnection} from "../../relations/tests/Entities";
import {useQueryBuilderExp} from "../useQueryBuilderExp";
import objectContaining = jasmine.objectContaining;


useQueryBuilderExp();

it('$at', async () => {

    const ar = getABCTestConnection().getRepository(AEntity);
    const br = getABCTestConnection().getRepository(BEntity);
    const [a] = await ar.save([ar.create()]);
    const [b] = await br.save([br.create({aOwner: a})]);

    await assertRelation(br, b, "aOwner", "a_id");
    await assertRelation(ar, a, "b", "b_id");

    expect(await ar.createQueryBuilder()
        .selectExp({$at: {b: "b_id"}}, "id")
        .andWhereInIds(a)
        .getRawOne())
        .toEqual({id: b.b_id});

    expect(await br.createQueryBuilder()
        .selectExp({$at: {aOwner: "a_id"}}, "id")
        .andWhereInIds(b)
        .getRawOne())
        .toEqual({id: a.a_id});

    async function assertRelation(repository, entity, relationPropertyName, idPropertyName) {
        expect(await repository.findOne(entity, {relations: [relationPropertyName]}))
            .toEqual(objectContaining({
                [relationPropertyName]: objectContaining({
                    [idPropertyName]: jasmine.any(String)
                })
            }));
    }


})
