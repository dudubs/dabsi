import {CommandOld} from "../CommandOld";
import {CommandHandlerOld} from "../CommandHandlerOld";
import {ExpressTester} from "./ExpressTests";

const SayHelloCommand = CommandOld<{ name: string }, string>();

export const SayHelloHandler = CommandHandlerOld(SayHelloCommand, ({name}) => {
    return `Hello ${name}!`;
});


export const SayHello = SayHelloCommand.connect(ExpressTester.fetchJSON)


it('sanity', async () => {
    ExpressTester.setExpressHandler(SayHelloHandler);
    expect(await SayHello({name: "David"})).toEqual(`Hello David!`)
});


it('tryUndefined to result', () => {
    return expectAsync(CommandOld<void, string>()
        .connect(async () => ({result: "OK"}))())
        .toBeResolvedTo("OK")
})

it('tryUndefined to error', () => {
    return expectAsync(CommandOld<void, string>()
        .connect(async () => ({error: "OK"}))())
        .toBeRejected("OK")
});

