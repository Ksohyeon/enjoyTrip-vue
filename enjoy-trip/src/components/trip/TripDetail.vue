<template>
  <b-container>
    <b-modal
      v-model="showModal"
      :title="selectedItem.관광지명"
      size="xl"
      @ok="closeModal"
      @cancel="closeModal"
      @close="closeModal"
    >
      <div class="d-flex justify-content-start">
        <img
          v-if="selectedItem.사진 !== ''"
          :src="selectedItem.사진"
          alt="이미지"
          width="100%"
          height="auto"
        />
        <img
          v-else
          src="@/assets/img/no_image.jpg"
          alt="이미지 없음"
          width="100%"
          height="auto"
        />
      </div>
      <div>
        <span>주소 : {{ selectedItem.주소 }}</span>
        <br />
        <br />
        <span>설명 : {{ selectedItem.설명 }}</span>
      </div>
      <!-- <div>
      </div> -->
      <div class="d-block text-center"></div>
    </b-modal>
  </b-container>
</template>

<style>
.modal-image {
  max-width: 100%;
  max-height: 500px;
  min-width: 100%;
  min-height: 100%;
}
</style>
<script>
export default {
  name: "TripDetail",
  props: { selectedItem: Object },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    closeModal() {
      console.log("꺼진다");
      this.$emit("closeModal");
    },
  },
};
</script>
