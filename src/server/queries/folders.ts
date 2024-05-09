import { ClientResponseError } from "pocketbase";
import pb from "..";
import { generate } from "random-words";

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
    const folderName = generate({exactly:2,maxLength:5,join:"-"})
    try {
        const id = pb.authStore.model?.id
        const folder = await pb.collection('folders').create({
            title:folderName,
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

export async function updateFolderByID(folderID: string, newTitle: string){
    try{
        await pb.collection('folders').update(folderID,{
            "title": newTitle
        })
    }catch(error: unknown){
        if(error instanceof ClientResponseError){
            throw new Error(error.message)
        }
    }
}
export async function deleteFolderByID(folderID: string){
    try{
        await pb.collection('folders').delete(folderID)
    }catch(error: unknown){
        if(error instanceof ClientResponseError){
            throw new Error(error.message)
        }
    }
}
