export default {
  async addToCart(context, payload) {
    try {
      const id = payload.id;
      const product = await this.$axios.$post("/api/products/cart", { id });
      context.commit("addToCart", product);
    } catch (err) {
      this.$router.push({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
  async changeQty({ state }, payload) {
    try {
      const updatedCart = await this.$axios.$put("/api/products/cart", payload);
      state.cart = updatedCart.cart
    } catch (err) {
      console.log(err)
      this.$router.push({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
  async getProducts(context, payload) {
    try {
      const {
        page = 1,
        category = "",
        input = "",
        maxPrice = 10000000,
        minPrice = 0,
        color = ""
      } = payload;
      const products = await this.$axios.$get(
        `/api/products?input=${input}&category=${category}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${color}`
      );
        return { pages: products.pages, products: products.products}
    } catch (err) {
      this.$router.push({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
  async completeOrder(context, payload) {
    try {
      const { mailingInfo, paymentInfo } = payload;
      await this.$axios.$post("/api/orders", {
        mailingInfo,
        paymentInfo
      });
      context.state.cart = [];
      return;
    } catch (err) {
      this.$router.push({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
  async removeFromCart({ state }, payload) {
    try {
      const { id } = payload;
      const updatedCart = await this.$axios.$delete("/api/products/cart", { data: { id } });
      state.cart = updatedCart.cart
    } catch (err) {
      this.$router.push({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
  setCart(context, payload) {
    context.state.cart = payload;
  },
};
