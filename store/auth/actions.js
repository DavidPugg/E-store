export default {
  async logout(context) {
    await this.$axios.post("/api/logout");
    context.state.user = null;
    this.$router.push("/products");
  },
  async login(context, payload) {
    try {
      const { username, password} = payload;
      const user = await this.$axios.post("/api/login", {
        username,
        password
      });
      if (user.status === 200) {
        const { username, email, info, _id } = user.data;
        const userInfo = {
          _id,
          username,
          email,
          info
        };
        context.commit("login", userInfo);
        context.dispatch("setErrorMessage", "", {
          root: true
        });
      }
      return;
    } catch (err) {
      context.dispatch("setErrorMessage", "Invalid username or password", {
        root: true
      });
    }
  },
  autoLogin(context, payload) {
    context.state.user = payload
  },
  async register(context, payload) {
    try {
      const user = await this.$axios.post("/api/register", payload);
      context.state.user = user.data;
      context.dispatch("setErrorMessage", "", {
        root: true
      });
      this.$router.push("/");
    } catch (err) {
      context.dispatch("setErrorMessage", err.response.data, {
        root: true
      });
    }
  },
  async saveUserInfo(context, payload) {
    try {
      await this.$axios.$put("/api/account", payload);
    } catch (err) {
      this.$router.push({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
};
