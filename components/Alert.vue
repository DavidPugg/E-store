<template>
  <transition name="alert">
    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="this.$store.state.errorMessage"
    >
      <b>{{ this.$store.state.errorMessage }}</b>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s;
}

.alert-enter,
.alert-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}

.alert {
  font-size: 2rem;
  padding: 1.5rem 3rem;
  border-top-left-radius: var(--border-radius-small);
  border-bottom-left-radius: var(--border-radius-small);
  position: fixed;
  top: 80%;
  right: 0;
  margin-left: auto;
  background-color: rgba(241, 152, 152, 1);
}
</style>
