export function cleaner() {
    return {
        type: "CLEAN_FAVORITES_GROUPS"
    }
}
export function userDataVK(data) {
    return {
        type: "OBTAINED_DATA",
        data
    }
}