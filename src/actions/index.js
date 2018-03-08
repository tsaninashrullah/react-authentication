export const selectUser = (user) => {
    return {
        type: "SELECT_USER",
        data: user
    }
}