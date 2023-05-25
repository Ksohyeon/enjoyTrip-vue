<template>
  <div>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  name: "TripView",
  components: {
    "footer-bar": () => import("@/components/common/FooterBar.vue"),
  },
};
</script>

<style></style>
