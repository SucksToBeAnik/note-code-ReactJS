import { ClientResponseError } from "pocketbase";
import pb from "..";
import { type CodeLanguage } from "../../store/slices/contentSlice";

export async function getCodeById(id: string) {
  try {
    const code = await pb.collection("codes").getOne(id);
    return code;
  } catch (error: unknown) {
    throw new Error("Something went wrong!");
  }
}

export async function createCode(
  folderID: string,
  title: string,
  body: string,
  language: CodeLanguage
) {
  try {
    const owner = pb.authStore.model;

    if (owner) {
      const code = await pb.collection("codes").create({
        title: title,
        body: body,
        language: language,
        owner: owner.id,
      });

      await pb.collection("folders").update(folderID, {
        "codes+": [code.id],
      });
    } else {
      throw new Error("User is not logged in");
    }
  } catch (error: unknown) {
    if (error instanceof ClientResponseError) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong!");
  }
}

export async function deleteCodeByID(id: string) {
  try {
    await pb.collection("codes").delete(id);
  } catch (error: unknown) {
    if (error instanceof ClientResponseError) {
      throw new Error(error.message);
    }
  }
}

export async function updateCodeByID(
  id: string | undefined,
  data: { title: string; body: string; language: CodeLanguage }
) {
  try {
    if (!id) {
      throw new Error(
        "Something went wrong. Code ID not found to update code!"
      );
    }
    await pb.collection("codes").update(id, {
      title: data.title,
      body: data.body,
      language: data.language,
    });
  } catch (error: unknown) {
    if (error instanceof ClientResponseError) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
}
