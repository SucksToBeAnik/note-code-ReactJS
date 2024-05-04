import { ClientResponseError } from "pocketbase";
import pb from "..";

export async function getFolders(){
    try {
        const id = pb.authStore.model?.id

        
        const data = await pb.collection('folders').getFullList({expand:'notes,codes',filter:`owner.id = "${id}"`,sort:'-created'})


        return data
    } catch (error) {
        throw new Error("Something went")
    }
}

export async function createFolder(){
    try {
        const id = pb.authStore.model?.id
        const folder = await pb.collection('folders').create({
            title:'New Folder',
            owner: id
        })
        return folder
    }catch(error:unknown){
        if(error instanceof ClientResponseError){
            throw new Error(error.message)
        }
        throw new Error("Something went wrong!")
    }
}

