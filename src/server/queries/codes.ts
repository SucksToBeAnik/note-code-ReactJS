import pb from "..";


export async function getCodeById(id: string) {
    try {
      const code = await pb.collection("codes").getOne(id);
      return code;
    } catch (error: unknown) {
      throw new Error("Something went wrong!");
    }
  }