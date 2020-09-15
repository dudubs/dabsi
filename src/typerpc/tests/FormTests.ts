import {Form} from "../widget/Form";
import {InputMap} from "../input/InputMap";
import {TextInput} from "../input/TextInput";
import {connectToRpc} from "../Rpc";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {

    it('expect to submit', async () => {
        expect(await connectToRpc(
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
