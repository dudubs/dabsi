import {InputMap} from "../input/InputMap";
import {TextInput} from "../input/TextInput";
import {Form} from "../Form";
import {connectToRpc} from "../Rpc";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {

    it('expect to submit', async () => {
        expect(await connectToRpc(
            Form<string>()(
                InputMap({
                    text: TextInput({trim: true})
                })
            ),
            {
                input: {text: null},
                submit: value => {
                    return {value: value.text.toUpperCase()};
                }
            })
            .submit({
                text: " hello "
            }))
            .toEqual(objectContaining({
                type: "result", value: "HELLO"
            }));
    })

});
