<template>
  <b-container>
    <b-row class="m-2">
      <b-col class="text-right">
        <b-button-group>
          <b-button @click="moveModify" variant="primary" v-if="isMyPlan"
            >수정</b-button
          >
          <b-button @click="moveDelete" variant="danger" v-if="isMyPlan"
            >삭제</b-button
          >
          <b-button @click="moveBoard">목록</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card border-variant="dark" no-body>
          <b-card-header class="text-center" v-if="this.plan">
            <h3>{{ plan.title }}</h3>
            <h5>{{ plan.theme }}</h5>
            <h6>{{ plan.author.nickName }}</h6>
            <h6>{{ plan.createdAt }}</h6>
            <b-button @click="like" v-if="!isliked">
              <b-icon icon="heart" aria-hidden="true"></b-icon>
              <div>{{ likeCnt }}</div>
            </b-button>
            <b-button @click="dislike" v-if="isliked">
              <b-icon
                icon="heart-fill"
                variant="danger"
                aria-hidden="true"
              ></b-icon>
              <div>{{ likeCnt }}</div>
            </b-button>
          </b-card-header>
          <b-card-body class="text-left" v-if="this.plan">
            <div :inner-html.prop="plan.content | enterToBr"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center pb-2 pt-5">
        <h4>타임라인</h4>
      </b-col>
    </b-row>
    <b-row>
      <plan-timeline :places="places"></plan-timeline>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import { mapState } from "vuex";

export default {
  name: "PlanDetail",
  components: {
    "plan-timeline": () => import("@/components/plan/include/PlanTimeline.vue"),
  },
  data: function () {
    return {
      plan: null,
      places: [],
      planno: null,
      isMyPlan: false,
      isliked: false,
      userId: null,
      likeCnt: 0,
    };
  },
  methods: {
    moveBoard() {
      this.$router.push({ name: "PlanMain" });
    },
    moveModify() {
      this.$router.push({ name: "PlanModify" });
    },
    moveDelete() {
      http.delete(`/plan/${this.planno}`).then((response) => {
        if (response.status == 200) {
          alert("삭제되었습니다.");
          this.$router.push({ name: "PlanMain" });
        }
      });
    },
    like() {
      this.isliked = !this.isliked;
      this.likeCnt++;
      http.post(`/plan/${this.planno}/like/${this.userId}`).then((response) => {
        console.log(response);
      });
    },
    dislike() {
      this.isliked = !this.isliked;
      this.likeCnt--;
      http
        .delete(`/plan/${this.planno}/like/${this.userId}`)
        .then((response) => {
          console.log(response);
        });
    },
  },
  created() {
    this.planno = this.$route.params.no;
    http.get(`/plan/${this.planno}`).then(({ status, data }) => {
      if (status == 200) {
        this.plan = data;
        this.places = data.places;
        this.userId = sessionStorage.getItem("userid");
        if (this.plan.author.userId == this.userId) {
          this.isMyPlan = true;
        }
        // 이미 좋아요 누른 게시글인지 확인
        for (let i = 0; i < this.plan.likeUsers.length; i++) {
          if (this.plan.likeUsers[i].userId == this.userId) {
            this.isliked = true;
            break;
          }
        }
      }
      this.likeCnt = this.plan.likeUsers.length;
      this.$store.state.myplan = data;
      console.log("myplan:", this.$store.state.myplan);
    });
  },
  computed: {
    myplan() {
      return this.$store.state.myplan;
    },
    ...mapState(["myplan"]),
  },
};
</script>

<style></style>
