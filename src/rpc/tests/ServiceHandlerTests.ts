import {CommandOld} from "../CommandOld";
import {ServiceOld} from "../ServiceOld";
import {ServiceHandlerOld} from "../ServiceHandlerOld";
import {ExpressTester} from "./ExpressTests";


export const TodoListService = ServiceOld({
    add: CommandOld<{ text: string }>(),

    delete: CommandOld<{ id: number }>(),

    get: CommandOld<void, { text: string, id: number }[]>()

});


const Todo = TodoListService.connect(
    ExpressTester.fetchJSON
)
// CommandOld<<Commands>()=> >();


beforeEach(() => {
    let TodoItems: string[] = [];

    ExpressTester.setExpressHandler(
        ServiceHandlerOld(TodoListService, {
            add: ({text}) => {
                TodoItems = [...TodoItems, text]
            },
            delete: ({id}) => {
                TodoItems = TodoItems.filter((_, index) => index === id)
            },
            get: () => {
                return TodoItems.map((text, id) => ({
                    text, id
                }))
            }
        })
    )
});

const TestService = ServiceOld({
    test: CommandOld()
})

it('', async () => {


    console.log("?");
    await Todo.add({text: "hello"});

})
