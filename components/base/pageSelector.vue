<template>
  <div class="d-flex justify-content-center mt-3 mb-5">
    <ul class="pagination">
      <li @click="goToPage(-1)" class="page-link">
        &laquo;
      </li>
      <li v-if="currentPage > 2" @click="goToPage(-2)" class="page-link">
        {{ currentPage - 2 }}
      </li>
      <li v-if="currentPage > 1" @click="goToPage(-1)" class="page-link">
        {{ currentPage - 1 }}
      </li>
      <li class="page-link selected">
        {{ currentPage }}
      </li>
      <li
        v-if="currentPage + 1 <= pages"
        @click="goToPage(1)"
        class="page-link"
      >
        {{ currentPage + 1 }}
      </li>
      <li
        v-if="currentPage + 2 <= pages"
        @click="goToPage(2)"
        class="page-link"
      >
        {{ currentPage + 2 }}
      </li>
      <li @click="goToPage(1)" class="page-link">
        &raquo;
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["pages"],
  computed: {
    currentPage() {
      return Number(this.$route.query.page);
    }
  },
  methods: {
    goToPage(num) {
      if (
        (this.currentPage === 1 && num < 1) ||
        (this.currentPage === this.pages && num > 0)
      )
        return;
      const newPage = this.currentPage + num;
      this.$router.push({
        path: "/products",
        query: { ...this.$route.query, page: newPage }
      });
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
.pagination {
  margin: 3rem 0;
  font-size: 1.8rem;
  font-weight: 300;
  user-select: none;
}

.selected {
  background-color: gainsboro;
  font-weight: 600;
  color: var(--color-primary) !important;
}

.page-link {
  cursor: pointer;
  color: black;
  padding: 0.5rem 1.5rem;
}

.page-link:first-child {
  border-top-left-radius: var(--border-radius-small);
  border-bottom-left-radius: var(--border-radius-small);
}

.page-link:last-child {
  border-top-right-radius: var(--border-radius-small);
  border-bottom-right-radius: var(--border-radius-small);
}
</style>
