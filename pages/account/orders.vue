<template>
  <div class="mb-5">
    <h1 class="text-center m-3 title">Orders</h1>
    <div class="d-flex justify-content-center row">
      <div v-for="order in orders" :key="order._id" class="card my-3 col-9">
        <OrderItem :order="order" class="mt-2 rounded-3">
      </OrderItem>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from "../../components/orders/orderItem.vue";
export default {
  components: {
    OrderItem
  },
  async asyncData({ $axios, redirect }) {
    try {
      const orders = await $axios.$get("/api/orders");
      return { orders };
    } catch (err) {
      redirect({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
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

</style>
