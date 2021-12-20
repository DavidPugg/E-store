<template>
  <div class="main">
    <div class="header">
      <h1 class="heading">Trgovina Cot</h1>
      <NuxtLink class="products" to="/products">Products</NuxtLink>
    </div>
  </div>
</template>

<script>
import ProductItem from "../components/products/productItem.vue";
export default {
  layout: "noNavbar",
  components: {
    ProductItem
  },
  computed: {
    products() {
      return this.$store.getters["products/getProducts"];
    },
    itemShadow() {
      return "shadow-sm p-3 mb-5 bg-body rounded";
    }
  },
  async asyncData(context) {
    await context.store.dispatch("products/getProducts", { category: "" });
  }
};
</script>

<style scoped>
.main {
  height: 100vh;
}

.header {
  background-image: linear-gradient(
      to right top,
      rgba(84, 39, 232, 0.8),
      rgba(129, 39, 232, 0.8)
    ),
    url(../assets/header.jpg);
  background-size: cover;
  height: 100%;
  background-position: top;
  /* clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.heading {
  transform: translateY(-8rem);
  font-size: 8rem;
  letter-spacing: .75rem;
  color: white;
}

.products {
    transform: translateY(-3rem);
  font-size: 2rem;
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 5rem;
  color: var(--color-secondary);
  transition: all 1s ease-out;
}

.products:hover {
  transform: translateY(-4rem);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .4);
}
</style>
