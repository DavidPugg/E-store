export default {
    isAuth(state) {
        if (state.user === null) {
            return false
        } else {
            return true
        }
    },
    getUser(state) {
        return state.user
    }
}