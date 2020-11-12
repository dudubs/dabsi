import { ManyToOne } from "typeorm";

export function RichTextColumn() {
  return ManyToOne(() => RichText);
}

export class RichText {}
