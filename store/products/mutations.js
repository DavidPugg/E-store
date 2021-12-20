export default {
  addToCart(state, payload) {
    const product = state.cart.find(p => p._id === payload._id);
    if (!product) {
      state.cart.push(payload);
    } else {
      const productIndex = state.cart.map(x => x._id).indexOf(payload._id);
      state.cart.splice(productIndex, 1, { ...product, qty: product.qty + 1 });
    }
  },
  changeQty(state, payload) {
    const product = state.cart.find(p => p._id === payload.id);
    const productIndex = state.cart.map(p => p._id).indexOf(payload.id);
    const newProduct = {
      ...product,
      qty: payload.qty
    };
    state.cart.splice(productIndex, 1, newProduct);
  },
};
