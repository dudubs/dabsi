import {EventsBinder} from "./EventsBinder";
import {EventsEmitter} from "./EventsEmitter";

export type EventsConnection<Outgoing, Incoming> = {
    emit: EventsEmitter<Outgoing>,
    on: EventsBinder<Incoming>
};
export type EventsPeer<Outgoing, Incoming> =
    EventsConnection<Outgoing, Incoming> & {
    client: EventsConnection<Incoming, Outgoing>;
}


export function EventsPeer<Outgoing, Incoming>(): {
    new(): EventsPeer<Outgoing, Incoming>
} {
    return <any>function (this: EventsPeer<Outgoing, Incoming>) {
        const incoming = EventsEmitter<Incoming>();
        const outgoing = EventsEmitter<Outgoing>();

        this.emit = outgoing;
        this.on = EventsBinder(incoming);

        this.client = {
            emit: incoming,
            on: EventsBinder(outgoing)
        };
    }

}
