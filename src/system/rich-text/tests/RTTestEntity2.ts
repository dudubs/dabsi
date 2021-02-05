import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class RTTestEntity2 extends RichTextEntity {
  @Column()
  testText!: string;
}

export const RTTestEntity2Type = "RTTestEntity2Type";

declare global {
  namespace IRichText {
    interface EntityDataTypes {
      [RTTestEntity2Type]: {
        packed: {
          testPackedData: any;
        };
        unpacked: {
          testUnpackedData: any;
          entityKey: string;
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
      [RTTestEntity2Type]: RTTestEntity2;
    }
  }
}
