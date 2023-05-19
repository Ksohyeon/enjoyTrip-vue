<template>
  <div class="text-light text-center planmain">
    <b-container>
      <b-row class="p-5">
        <b-col align-self="center" class="text1">
          누구나 쉽게 여행을 계획할 수 있습니다
        </b-col>
      </b-row>
      <b-row class="p-3">
        <b-col>
          <img src="@/assets/img/plan/planmain1.png" width="70%" />
          <b-button class="m-3" @click="moveCreatePlan">
            <b-icon icon="calendar3" font-scale="1" variant="dark"></b-icon>
            새로운 여행계획 만들기
          </b-button>
        </b-col>
        <b-col>
          <img src="@/assets/img/plan/planmain2.png" width="70%" />
          <b-button class="m-3">
            <b-icon icon="search" font-scale="1" variant="dark"></b-icon>
            나의 여행일정 보기
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "PlanMain",
  data() {
    return {};
  },
  methods: {
    moveCreatePlan() {
      this.$router.push({
        name: "PlanCreate",
      });
    },
  },
};
</script>

<style>
.planmain {
  background-color: #7bc0f9;
  width: 100%;
}
.text1 {
  font-size: 30px;
}
</style>
