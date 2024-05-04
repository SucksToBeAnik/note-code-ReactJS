import pb from "..";

export async function loginWithGithub() {
  try {

    const user = await pb
      .collection("users")
      .authWithOAuth2({ provider: "github" });


    if (user.meta?.isNew) {
      await pb.collection("users").update(user.record.id, {
        avatarUrl: user.meta?.avatarUrl,
        name: user.meta?.name,
      });
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export function logoutUser() {
  pb.authStore.clear();
}
