<template>
  <div class="d-flex flex-column text-center col-lg-3 col-md-4 col-sm-6 col-12 ">
    <div class="product m-3">
      <NuxtLink :to="`/products/${id}`" class="link">
        <div
          class="imgbox d-flex align-items-center justify-content-center my-2"
        >
          <img :src="img" class="card-img-top" alt="picture" />
        </div>
        <div class="card-body">
          <p class="card-title my-1" :class="dots">
            {{ shortenedTitle }}
          </p>
          <h4 class="card-text mb-3 mt-5 price">${{ fullPrice }}</h4>
        </div>
      </NuxtLink>
      <button class="btn w-100" @click="addToCart">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "img", "price", "id"],
  methods: {
    addToCart() {
      this.$store.dispatch("products/addToCart", { id: this.id });
    }
  },
  computed: {
    dots() {
      return this.name.length > 30 ? "longTitle" : "";
    },
    shortenedTitle() {
      return this.name.length > 30 ? this.name.substring(0, 30) : this.name;
    },
    fullPrice() {
      return Math.round(this.price * 100) / 100;
    }
  }
};
</script>

<style scoped>
.product {
  box-shadow: 0 5px 20px rgb(0 0 0 / 10%);
  transition: all .3s cubic-bezier(.65,.05,.36,1);
  border-radius: var(--border-radius-small);
  overflow: hidden;
}

.product:hover {
  transform: translateY(-1rem);
}

.card-title {
  font-size: 2rem;
  font-weight: 600;
}

.card-img-top {
  max-height: 90%;
  max-width: 90%;
  width: auto;
  background-color: transparent;
}

.imgbox {
  height: 15rem;
  width: 100%;
}
.longTitle::after {
  content: "...";
}

.link {
  text-decoration: none;
  color: black;
}

.price {
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(22, 202, 22);
}

.btn {
  border-radius: 0;
  color: white;
}
</style>
