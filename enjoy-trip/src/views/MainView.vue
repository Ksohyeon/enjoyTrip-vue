<template>
  <!-- <div>Main</div> -->
  <div class="div1">
    <b-container class="container">
      <!-- <div
      class="container bg-image"
      :style="`background-image: url(${imageUrl})`"
    ></div> -->
      <image-slide class="m-3"></image-slide>
    </b-container>
    <footer-bar class="footer"></footer-bar>
  </div>
</template>

<script>
export default {
  name: "MainView",
  components: {
    "image-slide": () => import("@/components/common/ImageSlide.vue"),
    "footer-bar": () => import("@/components/common/FooterBar.vue"),
  },

  Footerdata() {
    return {
      imageUrl: require("@/assets/img/mainpage.png"), // 이미지 파일 경로 수정
    };
  },
};
</script>

<style scoped>
html,
body,
template,
.div {
  height: 100%;
}
.container {
  background: center;
  height: 40vh; /* 이미지의 높이를 조정할 수 있음 */
  background-repeat: no-repeat; /* 이미지 반복 없음 */
  background-size: cover;
  height: 100%;
}
.footer {
}
</style>
