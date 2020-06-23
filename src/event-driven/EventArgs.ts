export type EventArgs<T> = T extends (void | undefined) ? [] :
    T extends any[] ? T : [T];
