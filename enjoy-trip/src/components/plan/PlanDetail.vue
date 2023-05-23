<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>여행계획 상세</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card border-variant="dark" no-body>
          <b-card-header class="text-center">
            <!-- <h5>({{ plan.no }})</h5> -->
            <h3>{{ plan.title }}</h3>
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
    };
  },
  created() {
    const planno = this.$route.params.no;
    http.get(`/plan/${planno}`).then(({ status, data }) => {
      if (status == 200) {
        this.plan = data;
        console.log("plan: ", this.plan);
        this.places = data.places;
        console.log(this.places);
      }
    });
  },
};
</script>

<style></style>
