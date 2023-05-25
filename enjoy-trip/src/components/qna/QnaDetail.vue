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
    <div>
      <div>
        <h5 class="mt-3">댓글 작성</h5>
      </div>
      <div class="input">
        <b-form-input type="text" v-model="commentContent" />
        <b-button @click="registComment" class="comment-button"
          >댓글 작성</b-button
        >
      </div>
      <div
        class="comment-box"
        v-for="comment in comments"
        :key="comment.commentNo">
        <span class="comment-data comment-author">{{
          comment.author.nickName
        }}</span>
        <span class="comment-data comment-date">
          {{ comment.createdAt }}
        </span>
        {{ comment.commentContent }}

        <span
          v-if="comment.author.userId === userId"
          class="comment-data comment-delete"
          @click="deleteComment(comment.commentNo)"
          >x</span
        >
      </div>
    </div>
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
      qnano: "",
      comments: [],
      commentContent: "",
      userId: "",
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
    getComments() {
      http.get(`/qna/${this.qnano}/comment`).then(({ status, data }) => {
        if (status == 200) {
          this.comments = data;
          console.log(this.comments);
        }
      });
    },
    registComment() {
      http
        .post(`/qna/${this.qnano}/comment`, {
          userId: this.userId,
          commentContent: this.commentContent,
        })
        .then(({ status }) => {
          if (status == 200) {
            alert("등록이 완료되었습니다.");
            this.getComments();
            this.commentContent = "";
          }
        });
    },
    deleteComment(commentNo) {
      http
        .delete(`/qna/${this.qnano}/comment/${commentNo}`)
        .then(({ status }) => {
          if (status == 200) {
            alert("삭제가 완료되었습니다.");
            this.getComments();
          }
        });
    },
  },
  created() {
    this.qnano = this.$route.params.no;
    this.userId = sessionStorage.getItem("userid");
    http.get(`/qna/${this.qnano}`).then(({ status, data }) => {
      if (status == 200) {
        this.qna = data;
        console.log(this.qna);
      }
    });
    this.getComments();
  },
};
</script>

<style>
.comment-box {
  border: 1px solid black;
  margin: 1rem 0 1rem 0;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 2rem;
  position: relative;
}
.input {
  margin-top: 1rem;
  display: flex;
}
.comment-button {
  width: 8rem;
}
.comment-data {
  position: absolute;
  background-color: white;
}

.comment-author {
  top: -0.8rem;
  left: 2rem;
}
.comment-date {
  top: -0.8rem;
  right: 2rem;
}

.comment-delete {
  right: 2rem;
  cursor: pointer;
  color: red;
  font-weight: bold;
}
</style>
