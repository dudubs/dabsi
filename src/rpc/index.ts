

// TypedRpc

/*

    FormListField(

    )

    FormArrayField(
        DataSelectInput<Group>()
    )


    TextInput
    DataForm
    Form({

    })


   Form<Result>()(
        // get only changed fields
        DataInputMap<Group>()(
            BooleanInput()
        )
   )
   .createRpcHandler({
        input: {

            source: GroupDS.select({ fields: {
                isUserGroup: {$at:{users: {$is: user.$key }}}
            } }),
            target: group=>group.isUserGroup
        },
        submit: values =>{
            for (const [row, value] of values) {

            }
        }
   })



    .handle({

    })


    user => ({


        target: {
            source: user.at("groups")
        }
    })


 */
