<template>
  <div>
    <router-view class="memberview"></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  name: "MemberView",
  components: {
    "footer-bar": () => import("@/components/common/FooterBar.vue"),
  },
};
</script>

<style>
.memberview {
  height: 82vh;
}
</style>
