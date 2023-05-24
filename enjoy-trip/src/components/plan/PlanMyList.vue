<template>
  <b-container>
    <b-row>
      <b-col class="text-center"><h3>나의 여행일정</h3></b-col>
    </b-row>
    <b-row>
      <b-col>
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
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
        {
          key: "hit",
          label: "조회수",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    rowClickListener(row, index) {
      console.log(row, index);
      this.$router.push({
        name: "PlanDetail",
        params: { no: row.no },
      });
    },
  },
  created() {
    const userId = sessionStorage.getItem("userid");
    http.get(`/plan/myplan/${userId}`).then(({ status, data }) => {
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

<style></style>
