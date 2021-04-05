export class Platform2 {
  readonly indexFileNames = new Set<string>();

  readonly testsFileNames = new Set<string>();

  readonly directories = new Set<string>();

  constructor(public readonly name: string) {}
}
