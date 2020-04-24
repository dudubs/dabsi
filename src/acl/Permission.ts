import {Entity, PrimaryColumn, TableInheritance} from "typeorm";

@Entity()
export class Permission {
    @PrimaryColumn()
    token: string;

    @PrimaryColumn({nullable: true})
    type: string;
}


export function PermissionColumn() {
    return function (target: Record<"permissions", Permission[]>, prop: "permissions") {

    }
}
