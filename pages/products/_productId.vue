<template>
  <div class="container">
    <div class="row mt-5">
      <div
        class="col-lg-6 imgbox d-flex align-items-center justify-content-center"
      >
        <img :src="product.image" alt="product image" class="img" />
      </div>
      <div
        class="textbox col-lg-6 text-center d-flex flex-column justify-content-center"
      >
        <h4 class="mb-5 title">{{ product.name }}</h4>
        <p class="text">{{ product.description }}</p>
        <h1 class="mt-5 price">${{ fullPrice }}</h1>
        <button class="btn btn-danger mt-2" @click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-6">
        <h1 class="title">Leave a Review!</h1>
        <form @submit.prevent="addReview">
          <div class="my-4">
            <Stars @rating="setRating" />
            <textarea
              class="form-control p-3"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Review..."
              v-model="review"
            ></textarea>
            <button
              class="btn btn-success mt-2 w-100"
              :style="{
                'background-color': isAuth ? '' : 'grey',
                'border-color': isAuth ? '' : 'grey'
              }"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div class="col-lg-6">
        <ReviewItem
          v-for="review in product.reviews"
          :key="review._id"
          :review="review"
          @delete="deleteReview"
        ></ReviewItem>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewItem from "../../components/products/reviewItem.vue";
export default {
  components: {
    ReviewItem
  },
  data() {
    return {
      rating: 1,
      review: ""
    };
  },
  async asyncData({ $axios, params, redirect }) {
    try {
      const product = await $axios.$get(`/api/products/${params.productId}`);
      return { product };
    } catch (err) {
      redirect({
        path: "/error",
        query: { status: err.response.status, msg: err.response.data }
      });
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch("products/addToCart", { id: this.product._id });
    },
    async addReview() {
      const isAuth = this.$store.getters["auth/isAuth"];
      const review = await this.$store.dispatch("reviews/addReview", {
        review: this.review,
        rating: this.rating,
        isAuth,
        route: this.$route.params.productId
      });
      if (!review) return;
      this.product.reviews.push(review);
      this.review = "";
      this.rating = 1;
    },
    deleteReview(id) {
      const reviewIndex = this.product.reviews.map(x => x._id).indexOf(id);
      this.product.reviews.splice(reviewIndex, 1);
    },
    setRating(r) {
      this.rating = r;
      console.log(r)
    }
  },
  computed: {
    fullPrice() {
      return Math.round(this.product.price * 100) / 100;
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 3rem;
  font-weight: 600;
}

.text {
  font-size: 1.6rem;
}

.price {
  font-weight: 600;
  color: rgb(22, 202, 22);
  margin-bottom: 1rem;
}

.img {
  max-height: 90%;
  max-width: 90%;
  width: auto;
}
.imgbox,
.textbox {
  height: 40rem;
}
</style>
