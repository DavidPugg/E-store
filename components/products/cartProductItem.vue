<template>
  <div class="row border-bottom border-top mb-1">
    <div class="imgbox d-flex align-items-center justify-content-center col-3">
      <img :src="img" class="card-img-top" alt="picture" />
    </div>
    <div class="col-5 my-auto">
      <h5 class="mx-2 text ">{{ title }}</h5>
    </div>
    <div class="col-2 my-auto">
      <h5 class="ms-auto me-5 price">${{ fullPrice }}</h5>
    </div>
    <div class="col-1 my-auto">
      <input
        type="number"
        v-model="quantity"
        class="form-control p-1 text-center"
      />
    </div>
    <div class="col-1 d-flex justify-content-center align-items-center">
      <button class="btn btn-danger btn-sm" @click="removeFromCart">X</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img", "title", "price", "id", "qty"],
  watch: {
    quantity() {
      this.$store.dispatch("products/changeQty", {
        id: this.id,
        qty: this.quantity
      });
    }
  },
  data() {
    return {
      quantity: this.qty
    };
  },
  computed: {
    fullPrice() {
      return Math.round(this.price * this.qty * 100) / 100;
    },
    cart() {
      return this.$store.getters["products/getCart"];
    }
  },
  methods: {
    removeFromCart() {
      this.$store.dispatch("products/removeFromCart", { id: this.id });
    }
  }
};
</script>

<style scoped>
* {
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
}

.imgbox {
  height: 8rem;
}
.card-img-top {
  max-height: 90%;
  max-width: 90%;
  width: auto;
  height: auto;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
input {
  min-width: 100%;
  max-width: 100%;
}

.row {
  border-radius: 2rem;
}

.price {
  color: rgb(22, 202, 22);
}
</style>
