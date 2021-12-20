<template>
  <div>
    <div class="d-flex mt-5">
      <ProductsNav class="col-lg-2 mt-5" />
      <ProductsList class="col-lg-10 mt-5" />
    </div>
  </div>
</template>

<script>
import ProductsList from "../../components/products/productsList.vue";
export default {
  components: {
    ProductsList
  }
};
</script>

