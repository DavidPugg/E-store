<template>
  <div>
    <div class="row col-md-8 offset-md-2">
      <div class="d-flex justify-content-center text-center border-bottom">
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
.link {
  text-decoration: none;
  color: grey;
  font-size: 1.8rem;
  color: var(--color-primary);
}
a.nuxt-link-exact-active {
  color: var(--color-secondary);
  font-weight: 600;
}
</style>
