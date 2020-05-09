import {Lang, LangPropsType} from "../Lang";
import {LangTranslator} from "../LangTranslator";

it("expect to default token", () => {
    expect(new LangTranslator({}).translateToken({type: LangPropsType.token, token: "HELLO_WORLD"}))
        .toEqual(new LangTranslator({}).translateDefaultToken("HELLO_WORLD"));
});

it('expect to replace name to "World"',()=>{
    expect(
        new LangTranslator({}).translateTemplate(
            Lang`HELLO_${"name"}!`({
                name:"World"
            }).props
        )
    ).toMatch(/World/);
})

