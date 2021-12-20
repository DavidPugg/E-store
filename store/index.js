import Vuex from "vuex";

import auth from "./auth/index";
import products from "./products/index";
import reviews from "./reviews/index";

export const store = new Vuex.Store({
  modules: {
    auth,
    products,
    reviews
  },
  state: () => ({
    errorMessage: ""
  }),
  actions: {
    async nuxtServerInit({ state, dispatch }, { req, redirect }) {
      try {
        if (req.user) {
          dispatch("auth/autoLogin", req.user);
        }
        if (req.session.cart) {
          dispatch("products/setCart", req.session.cart);
        }
      } catch (err) {
        redirect({
          path: "/error",
          query: { status: err.status, msg: err.message }
        });
      }
    },
    setErrorMessage({ state }, payload) {
      state.errorMessage = payload;
      setTimeout(() => {
        state.errorMessage = "";
      }, 3000);
    }
  }
});
