

export let events: any[];
export let expectedEvents: any[];

export function assertEvent(event) {
    expectedEvents.push(jasmine.objectContaining(event))
}


assertEvent.emit = (event: object) => {

    events.push(event);
};


beforeEach(() => {
    events = [];
    expectedEvents = [];
})

afterEach(() => {

    expect(events).toEqual(jasmine.arrayContaining(expectedEvents));
})
