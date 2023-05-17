<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3 class="underline">QnA</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="movePage">등록</b-button>
      </b-col>
    </b-row>

    <b-table
      v-if="qnas.length"
      class="text-center"
      striped
      hover
      head-variant="dark"
      :items="qnas"
      :fields="fields"
      @row-clicked="rowClickListener"
    ></b-table>
    <div v-else class="text-center">게시글이 없습니다.</div>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  data: function () {
    return {
      qnas: [],
      fields: [
        {
          key: "qnano",
          label: "no",
          sortable: true,
        },
        {
          key: "subject",
          label: "제목",
          sortable: true,
        },
        {
          key: "content",
          label: "내용",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    movePage() {
      this.$router.push({ name: "QnaCreate" });
    },
    rowClickListener(row, index) {
      console.log(index, row);

      this.$router.push({
        name: "QnaDetail",
        params: { qnano: row.qnano },
      });
    },
  },
  created() {
    http.get("/qnaapi/qna").then(({ status, data }) => {
      if (status == 200) {
        this.qnas = data;
        console.log(data);

        let i = 0;
        for (let qna of this.qnas) {
          qna.no = ++i;
        }
      }
    });
    console.log(this.qnas);
  },
};
</script>

<style></style>
