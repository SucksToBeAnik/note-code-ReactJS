import pb from "..";
import { ClientResponseError } from "pocketbase";

export async function getNoteById(id: string) {
  try {
    const note = await pb.collection("notes").getOne(id);
    return note;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
}

export async function createNote(
  folderId: string,
  title: string,
  body: string
) {
  try {
    const owner = pb.authStore.model;


    if (owner?.id) {
      const note = await pb.collection("notes").create({
        title: title,
        body: body,
        owner: owner?.id,
      });

      await pb.collection("folders").update(folderId, {
        "notes+": [note.id],
      });
    } else {
      throw new Error("User is not logged in");
    }
  } catch (error: unknown) {
    if(error instanceof ClientResponseError){
      console.log(error.data);
      throw new Error(error.data?.data?.body?.message || error.message)
    }
    throw new Error("Something went wrong!");
  }
}
