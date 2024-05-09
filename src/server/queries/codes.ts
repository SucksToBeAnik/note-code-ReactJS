import { ClientResponseError } from "pocketbase";
import pb from "..";


export async function getCodeById(id: string) {
    try {
      const code = await pb.collection("codes").getOne(id);
      return code;
    } catch (error: unknown) {
      throw new Error("Something went wrong!");
    }
  }


export async function deleteCodeByID(id:string){
  try{
    await pb.collection('codes').delete(id)
  }catch(error:unknown){
    if(error instanceof ClientResponseError){
      throw new Error(error.message)
    }
  }
}