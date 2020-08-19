import {FormTextField} from "../fields/FormTextField";
import {Form} from "../Form";
import {connectToRpc} from "../Rpc";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {

    it('', async () => {

        let checkedTextValue: any = undefined;

        expect(await connectToRpc(Form<{ text: string }>()({

            text: FormTextField({trim: true})

        }), {
            fields: {
                text: {
                }
            },
            async submit(value) {
                return {text: value.text.toUpperCase()}
            }
        }).submit({
            text: " hello "
        })).toEqual(objectContaining({
            type: "success", value: objectContaining({
                text: "HELLO"
            })
        }));

        expect(checkedTextValue).toEqual("hello")
    })

});
