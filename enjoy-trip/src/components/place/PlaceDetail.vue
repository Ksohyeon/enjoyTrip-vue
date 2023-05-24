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
      <b-col class="text-right" >
        <b-button  variant="outline-info" size="sm" @click="moveModifyPlace"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deletePlace"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <view-detail :place="place" :likeCnt="likeCnt" :isliked="isliked" :userId="userId" ></view-detail>
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
      likeCnt: 0,
      likeUsers: [],
      isMyPlan: false,
      isliked: false,
      userId: null,
    };
  },
  methods: {
    listPlace() {
      this.$router.push({ name: "PlaceList" });
    },
    moveModifyPlace() {
      this.$router.push({
        name: "PlaceModify",
        params: this.place.no,
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
        this.userId = sessionStorage.getItem("userid");
        if (this.place.author.userId == this.userId) {
          this.isMyPlan = true;
        }
        for (let i = 0; i < this.place.likeUsers.length; i++) {
          if (this.place.likeUsers[i].userId == this.userId) {
            this.isliked = true;
            break;
          }
        }
      }
    });
  },
};
</script>

<style></style>
