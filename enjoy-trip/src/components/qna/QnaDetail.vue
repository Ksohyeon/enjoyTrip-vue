<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3 class="underline">QnA 상세</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listQna">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyQna"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteQna"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <view-detail :qna="qna"></view-detail>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  components: {
    "view-detail": () => import("@/components/qna/include/ViewDetail"),
  },
  data: function () {
    return {
      qna: {},
    };
  },
  methods: {
    listQna() {
      this.$router.push({ name: "QnaList" });
    },
    moveModifyQna() {
      this.$router.push({
        name: "QnaModify",
        params: this.qna.no,
      });
    },
    deleteQna() {
      this.$router.push({
        name: "QnaDelete",
        params: this.qna.qnano,
      });
    },
  },
  created() {
    const qnano = this.$route.params.no;
    http.get(`/qna/${qnano}`).then(({ status, data }) => {
      if (status == 200) {
        this.qna = data;
        console.log(this.qna);
      }
    });
  },
};
</script>

<style></style>
