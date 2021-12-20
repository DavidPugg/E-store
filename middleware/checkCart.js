export default ({ store, redirect }) => {
    if (store.getters['products/getCart'].length < 1) {
        redirect('/checkout')
    }
}