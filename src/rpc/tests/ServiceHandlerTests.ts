import {Command} from "../Command";
import {Service} from "../Service";
import {ServiceHandler} from "../ServiceHandler";
import {ExpressTester} from "./ExpressTests";


export const TodoListService = Service({
    add: Command<{ text: string }>(),

    delete: Command<{ id: number }>(),

    get: Command<void, { text: string, id: number }[]>()

});


const Todo = TodoListService.connect(
    ExpressTester.fetchJSON
)
// Command<<T>()=> >();


beforeEach(() => {
    let TodoItems: string[] = [];

    ExpressTester.setExpressHandler(
        ServiceHandler(TodoListService, {
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

const TestService = Service({
    test: Command()
})

it('', async () => {





    console.log("?");
    await Todo.add({text: "hello"});

})
