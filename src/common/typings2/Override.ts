export type Override<T extends object, U extends object> = Omit<T, keyof U> & U;
