"use server"

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION, PROJECT_ID, storage, users } from "../appwrite.config"
import { CreateUserParams, RegisterUserParams } from "../../../types"
import { InputFile } from "node-appwrite/file";
import { parseStringify } from "../utils";

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

// GET USER
export const getUser = async (userId: string) => {
    try {
      const user = await users.get(userId);
      parseStringify(user);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the user details:",
        error
      );
    }
  };

// export const registerPatient = async ( {
//     identificationDocument,
//     ...patient
// }: RegisterUserParams) => {
//     try {
//         let file;

//         if (identificationDocument) {
//             const inputFile = InputFile.fromBuffer(
//                 identificationDocument.get('blobFile') as Blob,
//                 identificationDocument?.get('fileName') as string
//             )

//             file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
//         }

//         const newPatient = await databases.createDocument(
//             DATABASE_ID!,
//             PATIENT_COLLECTION!,
//             ID.unique(),
//             {
//                 identificationDocumentId: file?.$id || null,
//                 identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
//                 ...patient
//             }
//         );
        
//         return parseStringify(newPatient);
//     } catch (error: any) {
//         console.log("Error: ", error)
//         return error
//     }
// }