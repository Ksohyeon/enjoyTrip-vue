<template>
  <div>
    <router-view class="planview"></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  name: "TripView",
  components: {
    "footer-bar": () => import("@/components/common/FooterBar.vue"),
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.planview {
}
</style>
