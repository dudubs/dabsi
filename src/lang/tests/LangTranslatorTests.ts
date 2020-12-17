import {Lang, LangPropsType} from "@dabsi/lang/Lang";
import {LangTranslator} from "@dabsi/lang/LangTranslator";


testm(__filename, () => {

    it("expected to default token", () => {
        expect(new LangTranslator({}).translateToken("HELLO_WORLD"))
            .toEqual(new LangTranslator({}).translateDefaultToken("HELLO_WORLD"));
    });

    it('expected to replace name to "World"',()=>{
        expect(
            new LangTranslator({}).translateTemplate(
                Lang`HELLO_${"name"}!`({
                    name:"World"
                }).props
            )
        ).toMatch(/World/);
    })


});

