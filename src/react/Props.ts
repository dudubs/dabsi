export type Props<Base> = {

    pick<P, T extends P>(
        this: new() => P,
        props: T
    ): Pick<T, Exclude<keyof P, Exclude<keyof Base, keyof P>>>;

    omit<P, Base, T extends (P & Base)>(
        this: new() => P,
        props: T
    ): Omit<T, keyof P>;

};

/*


 */

export function Props<Base>(): {
    pick<P>(props)
} {
    throw new Error()
}
