<template>
  <div class="page">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Login</h5>
              </div>
              <div class="modal-body mx-5">
                <form @submit.prevent="login">
                  <div>
                    <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="username"
                    />
                  </div>
                  <div class="my-3">
                    <label for="username">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary me-auto"
                  @click="showModal = false"
                >
                  Continue without logging in
                </button>
                <button type="button" class="btn btn-primary" @click="login">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-8 offset-xl-2 py-3">
      <form @submit.prevent="completeOrder">
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
              :class="{ invalidInfo: !validFirstName }"
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
              :class="{ invalidInfo: !validLastName }"
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
            :class="{ invalidInfo: !validMobile }"
          />
        </div>
        <div class="col-12 mt-3">
          <label for="inputAddress" class="form-label">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            v-model="user.address"
            :class="{ invalidInfo: !validAddress }"
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
              :class="{ invalidInfo: !validCity }"
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">Country</label>
            <input
              type="text"
              class="form-control"
              id="inputCountry"
              v-model="user.country"
              :class="{ invalidInfo: !validCountry }"
            />
          </div>
          <div class="col-md-2">
            <label for="inputZip" class="form-label">Zip</label>
            <input
              type="number"
              class="form-control"
              id="inputZip"
              v-model="user.zip"
              :class="{ invalidInfo: !validZip }"
            />
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-start col-6">
            <NuxtLink class="btn btn-danger btn-lg mt-3" to="/checkout"
              >Cart</NuxtLink
            >
          </div>
          <div class="d-flex justify-content-end col-6">
            <button class="btn btn-success btn-lg mt-3">
              Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "checkCart",
  data() {
    return {
      username: "",
      password: "",
      validFirstName: true,
      validLastName: true,
      validMobile: true,
      validAddress: true,
      validCountry: true,
      validZip: true,
      validCity: true
    };
  },
  methods: {
    validateInfo() {
      if (this.user.address == null) return false;
      this.validFirstName = this.user.firstName.length < 1 ? false : true;
      this.validLastName = this.user.lastName.length < 1 ? false : true;
      this.validMobile = this.user.mobile < 1 ? false : true;
      this.validAddress = this.user.address.length < 1 ? false : true;
      this.validCountry = this.user.country.length < 1 ? false : true;
      this.validZip = this.user.zip < 1 ? false : true;
      this.validCity = this.user.city.length < 1 ? false : true;
      if (
        this.validFirstName &&
        this.validLastName &&
        this.validMobile &&
        this.validAddress &&
        this.validCountry &&
        this.validZip &&
        this.validCity
      ) {
        return true;
      } else {
        return false;
      }
    },
    completeOrder() {
      const validForm = this.validateInfo();
      if (validForm) {
        this.$emit("mailingInfo", this.user);
        this.$router.push("/checkout/payment");
      } else {
        this.$store.dispatch("setErrorMessage", "Please input all the info.", {
          root: true
        });
      }
    },
    async login() {
      await this.$store.dispatch("auth/login", {
        username: this.username,
        password: this.password
      });
      this.user = this.$store.getters["auth/getUser"].info;
      this.showModal = false;
    }
  },
  asyncData({ store }) {
    if (store.getters["auth/isAuth"]) {
      const user = store.getters["auth/getUser"].info;
      return { user };
    } else {
      const user = {
        firstName: null,
        lastName: null,
        mobile: null,
        address: null,
        country: null,
        zip: null,
        city: null
      };
      return { user, showModal: true };
    }
  }
};
</script>

<style scoped>
.page {
  font-size: 1.6rem;
}

a {
  text-decoration: none;
  color: white;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.invalidInfo {
  border-color: red;
}
</style>
