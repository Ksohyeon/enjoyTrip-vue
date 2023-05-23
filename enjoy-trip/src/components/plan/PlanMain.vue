<template>
  <div>
    <div class="text-light text-center planmain">
      <b-container>
        <b-row class="pt-5">
          <b-col align-self="center" class="text1">
            누구나 쉽게 여행을 계획할 수 있습니다
          </b-col>
        </b-row>
        <b-row class="p-4">
          <b-col>
            <img
              class="img"
              src="@/assets/img/plan/planmain1.png"
              width="70%"
            />
            <b-button class="m-3" @click="moveCreatePlan">
              <b-icon icon="calendar3" font-scale="1" variant="dark"></b-icon>
              새로운 여행계획 만들기
            </b-button>
          </b-col>
          <b-col>
            <img
              class="img"
              src="@/assets/img/plan/planmain2.png"
              width="70%"
            />
            <b-button class="m-3">
              <b-icon icon="search" font-scale="1" variant="dark"></b-icon>
              나의 여행일정 보기
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- 여행계획 게시판 -->
    <div id="planBoard" class="m-5">
      <b-table
        v-if="plans.length"
        class="text-center"
        hover
        head-variant="light"
        :items="plans"
        :fields="fields"
        @row-clicked="rowClickListener"
      >
      </b-table>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "PlanMain",
  data: function () {
    return {
      plans: [],
      fields: [
        {
          key: "authorName",
          label: "작성자",
          sortable: true,
        },
        {
          key: "createdAt",
          label: "작성일",
          sortable: true,
        },
        {
          key: "title",
          label: "제목",
          sortable: true,
        },
        {
          key: "startDate",
          label: "여행시작일",
          sortable: true,
        },
        {
          key: "endDate",
          label: "여행종료일",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    moveCreatePlan() {
      this.$router.push({
        name: "PlanCreate",
      });
    },
    rowClickListener(row, index) {
      console.log(row, index);
      this.$router.push({
        name: "PlanDetail",
        params: { no: row.no },
      });
    },
  },
  created() {
    http.get("/plan").then(({ status, data }) => {
      if (status == 200) {
        this.plans = data;
        console.log("plans: ", this.plans);

        for (let qna of this.plans) {
          qna.authorName = qna.author.nickName;
        }
      }
    });
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
.img {
  width: 58%;
}
</style>
