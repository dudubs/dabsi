import {FormTextField} from "../fields/FormTextField";
import {Form} from "../Form";
import {connectToRpc} from "../Rpc";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {

    it('expect to submit', async () => {
        expect(await connectToRpc(
            Form<string>()({
                text: FormTextField({trim: true})
            }),
            {
                fields: {text: null},
                submit: value => {
                    return value.text.toUpperCase();
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
