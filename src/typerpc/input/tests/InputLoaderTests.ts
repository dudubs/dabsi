import {createRpcConnection} from "../../Rpc";
import {InputErrorLoader} from "../InputLoader";
import {TextInput} from "../TextInput";


it('expect to error', async () => {

    const input = InputErrorLoader<"HELLO">()(
        TextInput()
    );
    const conn = createRpcConnection(
        input,
        {
            targetConfig: undefined,
            check() {
                return "HELLO"
            }
        }
    )

    expect(await conn.check("hello"))
        .toEqual("HELLO")
})
