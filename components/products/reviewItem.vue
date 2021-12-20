<template>
  <div class=" border-bottom border-top review p-2 mb-2">
    <div class="py-2 mx-1">
      <div class="d-flex align-items-center">
        <p class="starability-result" :data-rating="review.rating">
          Rated: 3 stars
        </p>
        <button
          v-if="isAuthor"
          class="btn btn-danger btn-sm ms-auto py-2 me-3"
          @click="deleteReview"
        >
          Delete
        </button>
      </div>
      <div class="text-break">
        <p>{{ review.review }}</p>
      </div>
      <div class="d-flex justify-content-end me-3">
        <p class="ms-auto">
          <b class="by">by {{ review.author.username }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["review"],
  computed: {
    isAuthor() {
      if (this.$store.getters["auth/isAuth"]) {
        return (
          this.review.author._id == this.$store.getters["auth/getUser"]._id
        );
      }
    }
  },
  methods: {
    async deleteReview() {
      await this.$store.dispatch("reviews/deleteReview", {
        reviewId: this.review._id,
        route: this.$route.params.productId
      });
      this.$emit("delete", this.review._id);
    }
  }
};
</script>

<style scoped>
.review {
  font-size: 1.6rem;
  border-radius: 2rem;
}

.by {
  font-size: 2rem;
}
</style>
