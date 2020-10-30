export abstract class AbstractDataQueryRunner {
  abstract getCount(): Promise<number>;
  abstract hasRows(): Promise<boolean>;
  abstract getRows(): Promise<any[]>;
}
