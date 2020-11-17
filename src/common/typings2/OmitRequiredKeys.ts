export type OmitRequiredKeys<T extends U, U> = Omit<T, keyof Required<U>>;
