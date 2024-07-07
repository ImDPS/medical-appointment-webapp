import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { CreateUserParams } from "../../../types"

export const createUser = async  (user: CreateUserParams ) => {
        
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            user.name
        )

        console.log("New User: ", newUser)

        return newUser;
        
    } catch (error: any) {
        console.log("Error: ", error)
        if (error && error?.code === 409){
            const documents= await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        } else {
            return error
        }
    }
}