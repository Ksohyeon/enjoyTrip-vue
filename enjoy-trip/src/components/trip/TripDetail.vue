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
        <img :src="selectedItem.사진" alt="이미지" width="800" height="500" />
        <p>주소 : {{ selectedItem.주소 }}</p>
      </div>
      <!-- <div>
      </div> -->
      <div class="d-block text-center"></div>
    </b-modal>
  </b-container>
</template>

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
