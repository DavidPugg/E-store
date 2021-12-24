<template>
  <div>
    <div class="row col-md-8 offset-md-2">
      <div class="d-flex justify-content-center text-center border-bottom mt-3">
        <p
          class="link col-4 py-2"
          :class="{ activePage: $route.path == '/checkout' }"
        >
          Cart
        </p>
        <p
          class="link col-4 py-2"
          :class="{ activePage: $route.path == '/checkout/deliveryInfo' }"
        >
          Delivery info
        </p>
        <p
          class="link col-4 py-2"
          :class="{ activePage: $route.path == '/checkout/payment' }"
        >
          Payment
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-center row">
      <div class="col-md-8">
        <NuxtChild
          @mailingInfo="setMailingInfo"
          :mailingInfo="mailingInfo"
          keep-alive
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailingInfo: {}
    };
  },
  methods: {
    setMailingInfo(mailingInfo) {
      this.mailingInfo = mailingInfo;
    }
  },
  computed: {
    disabled() {
      if (this.$store.getters["products/getCart"].length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.link {
  user-select: none;
  cursor: pointer;
  font-size: 1.8rem;
  text-decoration: none;
  color: grey;
  margin-bottom: 0;
  color: var(--color-primary);
}
.activePage {
  color: var(--color-secondary);
  font-weight: 600;
}
</style>
