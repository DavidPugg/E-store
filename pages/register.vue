<template>
  <div>
    <h1 class="text-center mt-4 title">Register</h1>
    <div class="row">
      <div class="col-xl-4 offset-xl-4 col-md-6 offset-md-3">
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="username" class="label">Username</label>
            <input
              type="username"
              class="form-control mb-3"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <label for="email" class="label">Email address</label>
            <input
              type="email"
              class="form-control  mb-3"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <div class="form-group  mb-3">
            <label for="password" class="label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      await this.$store.dispatch("auth/register", {
        username: this.username,
        password: this.password,
        email: this.email
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 3rem;
  font-weight: 600;
}

.label {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 2rem;
}

.btn {
  margin-top: 1rem;
}
</style>
