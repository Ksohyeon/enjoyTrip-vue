<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3 class="underline">MyPlace 상세</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listPlace">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyPlace"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deletePlace"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <view-detail :place="place"></view-detail>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  components: {
    "view-detail": () => import("@/components/place/include/ViewDetail"),
  },
  data: function () {
    return {
      place: {},
    };
  },
  methods: {
    listPlace() {
      this.$router.push({ name: "PlaceList" });
    },
    moveModifyPlace() {
      this.$router.push({
        name: "PlaceModify",
        params: this.place.placeno,
      });
    },
    deletePlace() {
      this.$router.push({
        name: "PlaceDelete",
        params: this.place.place,
      });
    },
  },
  created() {
    const no = this.$route.params.no;
    http.get(`/place/${no}`).then(({ status, data }) => {
      if (status == 200) {
        this.place = data;
      }
    });
  },
};
</script>

<style></style>
