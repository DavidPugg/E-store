<template>
  <nav class="navbar navbar-light navbar-expand-lg border-bottom">
    <div class="container">
      <div class="col-4">
        <NuxtLink class="ms-3 display-4 fw-bold" to="/products"
          >Trgovina</NuxtLink
        >
      </div>
      <div class="d-flex justify-content-center col-4">
        <form class="d-flex w-100" @submit.prevent="search">
          <input
            class="form-control search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchInput"
          />
          <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
        </form>
      </div>
      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse col-4" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
          <li class="nav-item d-flex justify-content-center">
            <NuxtLink
              class="nav-link pb-1 cart-link"
              aria-current="page"
              to="/checkout"
              ><img
                :src="require('~/assets/shopping-cart.png')"
                class="image mx-3"
                alt="Cart"
              />
              <transition name="cart" mode="out-in">
                <div v-if="cartCount > 0" :key="cartCount" class="cart-items">{{ cartCount }}</div>
              </transition>
            </NuxtLink>
          </li>
          <li class="nav-item d-flex justify-content-center" v-if="!isAuth">
            <NuxtLink
              class="nav-link pb-1 ms-3"
              aria-current="page"
              to="/login"
              :class="{ active: this.$route.path === '/login' }"
              >Login</NuxtLink
            >
          </li>
          <li class="nav-item d-flex justify-content-center" v-if="!isAuth">
            <NuxtLink
              class="nav-link pb-1 mx-3"
              aria-current="page"
              :class="{ active: this.$route.path === '/register' }"
              to="/register"
              >Register</NuxtLink
            >
          </li>
          <li class="nav-item d-flex justify-content-center" v-if="isAuth">
            <NuxtLink
              class="nav-link pb-1 mx-3"
              aria-current="page"
              :class="{ active: this.$route.path === '/account' }"
              to="/account"
              >Account</NuxtLink
            >
          </li>
          <li class="nav-item d-flex justify-content-center" v-if="isAuth">
            <div class="nav-link pb-1 mx-3 logout" aria-current="page" @click="logout">
              Logout
            </div>
          </li>
        </ul>
      </div>
      <!-- <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchInput: ""
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    cartCount() {
      return this.$store.getters["products/getCart"].length;
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch("auth/logout");
    },
    async search() {
      this.$router.push({
        path: "/products",
        query: { ...this.$route.query, input: this.searchInput, page: 1 }
      });
    }
  }
};
</script>

<style scoped>
.navbar-light .nav-item {

  font-weight: 600 !important;
}

.nav-link {
  font-size: 1.6rem;
  transition: all 0.1s ease;
}

.nav-link:hover,
.navbar-brand:hover {
  color: var(--color-secondary);
  transform: translateY(-1px);
}

.navbar {
  background-color: #fff;
}

.active {
  color: var(--color-secondary);
  border-bottom: 1px solid var(--color-secondary);
}
.image {
  height: 30px;
  width: auto;
}

.logout {
  cursor: pointer;
}

.custom-toggler {
  border: none;
}

.cart-link {
  position: relative;
}

.cart-items {
  color: white;
  position: absolute;
  bottom: 0%;
  right: 10%;
  width: 1.9rem;
  height: 1.9rem;
  background-color: var(--color-primary);
  border-radius: 1000px;
  font-weight: 600;
  font-size: 1.3rem;
  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-enter-active, .cart-leave-active {
  transition: all .2s ease;
}

.cart-enter, .cart-leave-to {
  transform: translateY(-2px);
}
</style>
