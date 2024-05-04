import pb from "../server";


export function isAuthorized(){
    const isAuthorized = pb.authStore.isValid
    return isAuthorized
}

export function isAdmin(){
    const isAdmin = pb.authStore.isAdmin
    return isAdmin
}