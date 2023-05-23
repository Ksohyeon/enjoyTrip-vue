<template>
  <b-container>
    <b-row>
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
          <b-card-header class="text-center">
            <h3>{{ plan.title }}</h3>
            <h5>{{ plan.theme }}</h5>
            <h6>{{ plan.author.nickName }}</h6>
            <h6>{{ plan.createdAt }}</h6>
          </b-card-header>
          <b-card-body class="text-left">
            <div :inner-html.prop="plan.content | enterToBr"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <plan-timeline :places="places"></plan-timeline>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "PlanDetail",
  components: {
    "plan-timeline": () => import("@/components/plan/include/PlanTimeline.vue"),
  },
  data: function () {
    return {
      plan: {},
      places: [],
      planno: null,
      isMyPlan: false,
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
  },
  created() {
    this.planno = this.$route.params.no;
    http.get(`/plan/${this.planno}`).then(({ status, data }) => {
      if (status == 200) {
        this.plan = data;
        console.log("plan: ", this.plan);
        this.places = data.places;
        if (this.plan.author.userId == sessionStorage.getItem("userid")) {
          this.isMyPlan = true;
        }
      }
    });
  },
};
</script>

<style></style>
