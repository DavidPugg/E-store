<template>
  <div>
    <div v-if="cart.length != 0" class="col-xl-10 offset-xl-1 mt-3">
      <cart-product-item
        v-for="product in cart"
        :key="product._id"
        :img="product.image"
        :title="product.name"
        :price="product.price"
        :id="product._id"
        :qty="product.qty"
      ></cart-product-item>
      <div class="my-5 d-flex">
        <h3><b>Total:</b> ${{ totalPrice }}</h3>
        <button class="btn btn-success btn-lg ms-auto" @click="checkout">
          Checkout
        </button>
      </div>
    </div>
    <div v-else>
      <h3 class="text-center mt-5">
        Your cart is empty, please add something to the cart and try again!
      </h3>
    </div>
  </div>
</template>

<script>
import cartProductItem from "../../components/products/cartProductItem.vue";
export default {
  components: { cartProductItem },
  computed: {
    totalPrice() {
      let total = 0;
      for (let product of this.cart) {
        total += product.price * product.qty;
      }
      return Math.round(total * 100) / 100;
    },
    cart() {
      return this.$store.getters['products/getCart'];
    }
  },
  methods: {
    checkout() {
      this.$router.push("/checkout/deliveryInfo");
    }
  }
};
</script>

<style scoped>

* {
  font-size: 2rem;
}

</style>
