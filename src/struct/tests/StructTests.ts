import "reflect-metadata";

import {Field, getStructMetadata, Struct} from "../index";


export class AStruct extends Struct {

    @Field()
    aString: string;

    @Field()
    aNumber: number;

    @Field()
    aStruct?: AStruct;

    @Field()
    arrayOfStrings: string[];

    @Field()
    arrayOfNumbers: number[];

    @Field()
    arrayOfStruct: AStruct[];

}


fit('',()=>{
   getStructMetadata(AStruct);
})
