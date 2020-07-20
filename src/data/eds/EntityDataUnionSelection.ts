import {SelectQueryBuilder} from "typeorm";
import {entries} from "../../common/object/entries";
import {DataSelection} from "../DataSelection";
import {AnyDataUnion} from "../DataUnion";
import {QueryBuilderSelector} from "./QueryBuilderSelector";


export namespace EntityDataUnionSelection {


    export function select(
        qb: SelectQueryBuilder<any>,
        selector: QueryBuilderSelector,
        selection: DataSelection<any>,
        union: AnyDataUnion
    ) {

        for (let [unionKey,unionSelection] of entries(selection.unions)) {
            const unionType = union.unionChildren[unionKey];

        }

    }

}
