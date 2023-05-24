<template>
  <div>
    <h1>QnA 삭제</h1>
    <div>삭제중...</div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  created() {
    if (confirm("정말로 삭제?")) {
      const qnano = this.$route.params.qnano;
      http.delete(`/qnaapi/qna/${qnano}`).then(({ status }) => {
        if (status == 200) {
          alert("삭제가 완료되었습니다.");
        }
        this.$router.push({ name: "QnaList" });
      });
    }
  },
};
</script>
