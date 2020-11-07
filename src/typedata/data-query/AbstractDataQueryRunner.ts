export abstract class AbstractDataQueryRunner {
  abstract getCount(): Promise<number>;
  abstract hasRow(): Promise<boolean>;
  abstract getRows(): Promise<any[]>;
}
