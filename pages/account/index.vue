<template>
  <div class="col-xl-8 offset-xl-2 py-3 page">
    <form @submit.prevent="saveUserInfo">
      <h3 class="title">Personal</h3>
      <div class="row">
        <div class="col">
          <label for="firstName" class="form-label">First name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            aria-label="First name"
            id="firstName"
            v-model="user.firstName"
          />
        </div>
        <div class="col">
          <label for="lastName" class="form-label">Last name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            aria-label="Last name"
            id="lastName"
            v-model="user.lastName"
          />
        </div>
      </div>
      <div class="col-12 mt-3">
        <label for="inputMobile" class="form-label">Mobile</label>
        <input
          type="number"
          class="form-control"
          id="inputMobile"
          v-model="user.mobile"
        />
      </div>
      <h3 class="mt-5 title">Delivery</h3>
      <div class="col-12 mt-3">
        <label for="inputAddress" class="form-label">Address</label>
        <input
          type="text"
          class="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          v-model="user.address"
        />
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input
            type="text"
            class="form-control"
            id="inputCity"
            v-model="user.city"
          />
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">Country</label>
          <input
            type="text"
            class="form-control"
            id="inputCity"
            v-model="user.country"
          />
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">Zip</label>
          <input
            type="number"
            class="form-control"
            id="inputZip"
            v-model="user.zip"
          />
        </div>
      </div>
      <div class="d-flex justify-content-end button-box">
        <button class="btn btn-success btn-lg mt-3">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    const user = store.getters['auth/getUser'].info;
    return { user };
  },
  methods: {
    async saveUserInfo() {
      this.$store.dispatch('auth/saveUserInfo', this.user)
    }
  }
};
</script>

<style scoped>
.page {
  font-size: 1.6rem;
}

.title {
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form-label {
margin-bottom: .5rem;
}

.button-box {margin-top: 1rem;}
</style>
