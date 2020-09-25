import {Form} from "../widget/Form";
import {InputMap} from "../input/InputMap";
import {TextInput} from "../input/TextInput";
import {createRpcConnection} from "../Rpc";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {

    it('expect to submit', async () => {
        expect(await createRpcConnection(
            Form<string>()(
                InputMap({
                    text: TextInput()
                })
            ),
            {
                input: {
                    text: {
                        trim: true
                    }
                },
                submit: value => {
                    expect(value.text).toEqual("hello")
                    return {value: value.text.toUpperCase()};
                }
            })
            .submit({
                text: " hello "
            }))
            .toEqual(objectContaining({
                value: "HELLO"
            }));
    })

});
