<template>
<div class="container mt-5">
  <div class="alert alert-danger" role="alert">
  <h4 class="alert-heading">{{ this.$route.query.status }}</h4>
  <p>{{ this.$route.query.msg }}</p>
</div>
</div>
</template>

<script>
export default {
layout: 'noNavbar'
}
</script>

<style>

</style>