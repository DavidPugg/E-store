<template>
  <div>
    <div class="d-flex flex-wrap justify-content-center list">
      <Spinner v-if="$fetchState.pending" class="box" />
      <p v-else-if="products.length === 0" class="my-5 text-center no-products">
        No products found!
      </p>
      <product-item
        v-else
        v-for="product in products"
        :key="product._id"
        :name="product.name"
        :price="product.price"
        :img="product.image"
        :id="product._id"
      ></product-item>
    </div>
    <PageSelector :pages="pages"></PageSelector>
  </div>
</template>

<script>
import ProductItem from "../../components/products/productItem.vue";
import PageSelector from "../../components/base/pageSelector.vue";
export default {
  watch: {
    "$route.query": "$fetch"
  },
  data() {
    return {
      pages: null,
      products: []
    };
  },
  components: {
    ProductItem,
    PageSelector
  },
  async fetch() {
    if (!this.$route.query.page) {
      this.$router.push({
        path: "/products",
        query: { ...this.$route.query, page: 1 }
      });
    }
    const { pages, products } = await this.$store.dispatch(
      "products/getProducts",
      {
        ...this.$route.query
      }
    );
    this.pages = pages;
    this.products = products;
  }
};
</script>

<style scoped>
.box {
  margin-bottom: 100vh;
}

.list {
  padding: 0;
}

.no-products {
  font-weight: 600;
  font-size: 3rem;
}
</style>
