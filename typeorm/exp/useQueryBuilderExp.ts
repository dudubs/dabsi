import {SelectQueryBuilder} from "typeorm";
import {JSONExp} from "../../json-exp/JSONExp";
import {QBJSONExpTranslator} from "./QBJSONExpTranslator";

declare module "typeorm" {
    interface SelectQueryBuilder<Entity> {

        exp(exp: JSONExp<Entity>);

        selectExp(exp: JSONExp<Entity>, aliasName?: string):this;

        addSelectExp(exp: JSONExp<Entity>, aliasName?: string): this;

        whereExp(exp: JSONExp<Entity>): this;

        andWhereExp(exp: JSONExp<Entity>): this;

        orWhereExp(exp: JSONExp<Entity>): this;

        orderByExp(exp: JSONExp<Entity>, order?: "ASC" | "DESC", nulls?: "NULLS FIRST" | "NULLS LAST"):
            this;


    }
}


export function useQueryBuilderExp() {
    const qb = SelectQueryBuilder.prototype;
    qb.exp = function <T>(this: SelectQueryBuilder<T>, exp: JSONExp<T>) {
        return new QBJSONExpTranslator(this, this.alias).translate(exp)
    };

    install('where');
    install('andWhere');
    install('orWhere');

    install('select');
    install('addSelect');
    install('orderBy');


    function install(prop) {
        qb[prop + 'Exp'] = function (this: SelectQueryBuilder<any>, exp, ...args) {
            return this[prop](this.exp(exp), ...args);
        }
    }
}

