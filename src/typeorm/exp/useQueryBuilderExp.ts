import {SelectQueryBuilder} from "typeorm";
import {mapFactory} from "../../common/map/mapFactory";
import {SymbolMap} from "../../common/map/SymbolMap";
import {Lazy} from "../../common/patterns/lazy";
import {JSONExp} from "../../json-exp/JSONExp";
import {QBJSONExpTranslator} from "./QBJSONExpTranslator";

declare module "typeorm" {
    interface SelectQueryBuilder<Entity> {

        exp(exp: JSONExp<Entity>);

        selectExp(exp: JSONExp<Entity>, aliasName?: string): this;

        buildSelectExp(aliasName: string, exp: JSONExp<Entity>): this;

        addSelectExp(exp: JSONExp<Entity>, aliasName?: string): this;

        whereExp(exp: JSONExp<Entity>): this;

        andWhereExp(exp: JSONExp<Entity>): this;

        orWhereExp(exp: JSONExp<Entity>): this;

        orderByExp(exp: JSONExp<Entity>, order?: "ASC" | "DESC", nulls?: "NULLS FIRST" | "NULLS LAST"):
            this;


        addOrderByExp(exp: JSONExp<Entity>, order?: "ASC" | "DESC", nulls?: "NULLS FIRST" | "NULLS LAST"):
            this;


    }
}


export const QueryBuilderTranslator = SymbolMap<SelectQueryBuilder<any>, QBJSONExpTranslator<any>>("translator");

const getQueryBuilderTranslator = mapFactory(QueryBuilderTranslator, qb => QBJSONExpTranslator.create(qb));

export const useQueryBuilderExp = Lazy(() => {
    const qb = SelectQueryBuilder.prototype;

    qb.exp = function <T>(this: SelectQueryBuilder<T>, exp: JSONExp<T>) {
        return getQueryBuilderTranslator(this).translate(exp)
    };

    install('where');
    install('andWhere');
    install('orWhere');

    install('select');
    install('addSelect');
    install('orderBy');
    install('addOrderBy');


    qb.buildSelectExp = function (this: SelectQueryBuilder<any>, aliasName,
                                  exp: JSONExp<any>) {


        if (!this.expressionMap.selects[0]?.aliasName) {
            return this.selectExp(exp, aliasName);
        } else {
            return this.addSelectExp(exp, aliasName)
        }
    }

    function install(prop) {
        qb[prop + 'Exp'] = function (this: SelectQueryBuilder<any>, exp, ...args) {
            return this[prop](this.exp(exp), ...args);
        }
    }
});

