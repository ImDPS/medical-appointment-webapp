import * as sdk from "node-appwrite"

const{
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env

console.log("list :", PROJECT_ID, API_KEY, ENDPOINT)


const client = new sdk.Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('med-appo')
    .setKey('b70831398070e4282ac73135574a496fa70a5430baeb4b58bfeba419582c485725e13e14b6c8930d15ebfd662fbe2cd0c3cad7589fce746a21282c6ed26ecc8b3200fcb75e1edc1be83f8d7d642f1ffc0338ecd5e3a3eeb196929b63973f2941ddc34df6771db62363eecaaca3711ea22af05f19c60d8ec2d4c096405c3ac7fd')

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Functions(client);
export const users = new sdk.Users(client); 