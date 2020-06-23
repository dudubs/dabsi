export type Notificator<T> = {

    connect(emitter: (event: T) => void);

    on<This>(this: This, callback: (event: T) => void): This;

    off<This>(this: T, callback: (event: T) => void): This;


};


