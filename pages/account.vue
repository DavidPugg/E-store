<template>
  <div class="page">
    <div class="row col-md-8 offset-md-2">
      <div
        class="d-flex justify-content-center text-center border-top border-bottom lines"
      >
        <div class="col-4 py-2" id="cart">
          <NuxtLink class="link" to="/account/">Account Settings</NuxtLink>
        </div>
        <div class="col-4 py-2" id="delivery">
          <NuxtLink class="link" to="/account/orders">Orders</NuxtLink>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center row">
      <div class="col-md-8">
        <NuxtChild keep-alive />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "checkAuth"
};
</script>

<style scoped>
.page {
  font-size: 1.6rem;
}

.link {
  text-decoration: none;
  color: grey;
}
a.nuxt-link-exact-active {
  color: var(--color-primary);
  font-weight: 600;
}

.lines {
  border-radius: 2rem;
}
</style>
