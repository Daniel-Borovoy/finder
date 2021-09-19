export function cleaner() {
    return {
        type: "CLEAN_FAVORITES_GROUPS"
    }
}
export function vkData(dataVK) {
    return {
        type: "DATA_RECEIVED",
        dataVK
    }
}