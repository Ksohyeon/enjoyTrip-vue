<template>
  <div>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  "footer-bar": () => import("@/components/common/FooterBar.vue"),
};
</script>

<style></style>
