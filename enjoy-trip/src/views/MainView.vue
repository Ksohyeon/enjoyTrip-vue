<template>
  <div>Main</div>
  <div class="container bg-image" :style="`background-image: url(${imageUrl})` " >
  </div>
</template>

<script>
export default {
  name: "MainView",
  components: {},
};
</script>

<style></style>
  data() {
    return {
      imageUrl: require('@/assets/img/mainpage.png'), // 이미지 파일 경로 수정
    };
  },
};
</script>

<style scoped>
.container {
  height: 400px; /* 이미지의 높이를 조정할 수 있음 */
  background-repeat: no-repeat; /* 이미지 반복 없음 */
}
</style>
