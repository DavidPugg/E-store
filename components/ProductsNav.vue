<template>
  <div
    class="p-0 m-0 d-flex flex-lg-column flex-sm-row flex-column justify-content-md-around align-items-md-stretch"
  >
    <nav
      class="navbar navbar-light p-0 d-flex flex-column align-items-center justify-content-around border flex-lg-grow-0 flex-sm-grow-1 me-0 me-sm-3 me-lg-0"
    >
      <h5 class="my-3">Category</h5>
      <NuxtLink
        v-for="item in categories"
        :key="item.name"
        class="nav-item"
        :class="{ selected: $route.query.category === item.category }"
        :to="{
          path: '/products',
          query: { ...$route.query, category: item.category, page: 1 }
        }"
        >{{ item.name }}</NuxtLink
      >
    </nav>

    <div class="mt-3 mt-sm-0 mt-lg-3 flex-md-grow-1">
      <nav class="navbar p-0 d-flex flex-column align-items-center border">
        <h5 class="my-3">Filters</h5>
        <div
          class="col-12 d-flex flex-column justify-content-center align-items-center text-center mt-2"
        >
          <div class="text-center">
            <p class="m-0 mb-2"><b>Color</b></p>
          </div>
          <div class="col-10 d-flex justify-content-around align-items-center">
            <NuxtLink
              v-for="color in colors"
              :key="color"
              :class="{ 'selected-color': $route.query.color === color }"
              class="color-button"
              :style="{ 'background-color': color || 'grey' }"
              :to="{
                path: '/products',
                query: { ...$route.query, color: color, page: 1 }
              }"
            ></NuxtLink>
          </div>

          <div class="text-center mt-3">
            <p class="m-0 mb-2 filter"><b>Price</b></p>
          </div>
          <div class="col-12 d-flex justify-content-around align-items-center">
            <input
              class="form-control mx-3 text-center price"
              type="number"
              placeholder="min"
              v-model="minPrice"
              @input="changeQuery"
            />
            <p class="m-0">-</p>
            <input
              class="form-control mx-3 text-center price"
              type="number"
              placeholder="max"
              v-model="maxPrice"
              @input="changeQuery"
            />
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minPrice: undefined,
      maxPrice: undefined,
      categories: [
        {
          name: "All products",
          category: undefined
        },
        {
          name: "Shoes",
          category: "shoes"
        },
        {
          name: "Shirts",
          category: "shirt"
        },
        {
          name: "Pants",
          category: "pants"
        }
      ],
      colors: [undefined, "red", "blue", "black"]
    };
  },

  methods: {
    changeQuery() {
      if (this.minPrice == "") {
        this.minPrice = undefined;
      }
      if (this.maxPrice == "") {
        this.maxPrice = undefined;
      }
      this.$router.push({
        path: "/products",
        query: {
          ...this.$route.query,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          page: 1
        }
      });
    }
  }
};
</script>

<style scoped>
h5 {
  font-size: 2rem;
  font-weight: 600;
}

.nav-item {
  width: 100%;
  text-align: center;
  transition: all 0.1s ease;
  padding: 0.5rem 0;
}

.nav-item:hover {
  background-color: rgba(212, 212, 212, 0.705);
}

a:hover {
  color: var(--color-primary);
}

.navbar {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-small);
  font-size: 1.6rem;
}

.selected {
  color: var(--color-secondary);
  font-weight: 600;
  background-color: rgba(212, 212, 212, 0.705);
}

.color-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
  transition: all 0.1s ease;
}

.color-button:hover {
  transform: scale(1.15);
}

.selected-color {
  transform: scale(1.15);
}

.price {
  margin: 0.5rem 0;
}
</style>
