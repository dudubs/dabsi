import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class RTTestEntity1 extends RichTextEntity {
  @Column()
  testText!: string;
}

export const RTTestEntity1Type = "RTTestEntity1Type";

declare global {
  namespace IRichText {
    interface EntityDataTypes {
      [RTTestEntity1Type]: {
        packed: string;
        unpacked: {
          testKey: string;
          dataText: string;
          entityText: string;
        };
        readonly: {
          entityText: string;
          dataText: string;
        };
      };
    }
    interface EntityChildren {
      [RTTestEntity1Type]: RTTestEntity1;
    }
  }
}
