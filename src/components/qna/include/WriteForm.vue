<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h1 class="underline">{{ writeFormTitle }}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-left">
        <b-form>
          <b-form-group
            label-cols="12"
            id="subject-group"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input
              id="subject"
              ref="subject"
              v-model="subject"
              type="text"
              required
              placeholder="제목 입력..."
            />
          </b-form-group>
          <b-form-group
            label-cols="12"
            id="content-group"
            label="내용:"
            label-for="content"
            ref="content"
          >
            <b-form-textarea
              id="content"
              v-model="content"
              placeholder="내용 입력..."
              rows="10"
              max-rows="15"
            ></b-form-textarea>
          </b-form-group>

          <b-button
            v-if="type == 'create'"
            variant="primary"
            class="m-1"
            @click="validate"
            >등록</b-button
          >
          <b-button v-else variant="success" class="m-1" @click="validate"
            >수정</b-button
          >
          <b-button variant="primary" class="m-1" @click="moveList"
            >목록</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  props: {
    type: String, // create, modify
  },
  data: function () {
    return {
      userId: sessionStorage.getItem("userid"),
      subject: "",
      content: "",
    };
  },
  computed: {
    writeFormTitle: function () {
      return this.type == "create" ? "QnA 등록" : "QnA 수정";
    },
  },
  methods: {
    validate() {
      let isValid = true; // 유효하면 true
      let errMsg = "";

      !this.subject
        ? ((isValid = false),
          (errMsg = "제목을 입력해주세요."),
          this.$refs.isbn.focus())
        : !this.content
        ? ((isValid = false),
          (errMsg = "content을 입력해주세요."),
          this.$refs.content.focus())
        : (isValid = true);

      if (!isValid) {
        alert(errMsg);
      } else {
        if (this.type == "create") {
          this.registQna();
        } else {
          this.modifyQna();
        }
      }
    },
    registQna() {
      http
        .post("/qnaapi/qna", {
          userId: this.userId,
          qnano: null,
          subject: this.subject,
          content: this.content,
        })
        .then(({ status }) => {
          if (status == 200) {
            alert("등록이 완료되었습니다.");
          }

          // 목록 페이지로 이동하기
          this.$router.push({ name: "QnaList" });
        });
    },
    modifyQna: function () {
      // 1. axios 이용해서 서버와 통신 후 수정처리
      http
        .put(`/qnaapi/qna/${this.qnano}`, {
          qnano: this.qnano,
          subject: this.subject,
          content: this.content,
        })
        .then(({ status }) => {
          if (status == 200) {
            alert("수정이 완료되었습니다.");
          }
          // 2. 도서 목록 페이지로 이동
          this.$router.push({ name: "QnaList" });
        });
    },
    moveList() {
      this.$router.push({ name: "QnaList" });
    },
  },
  created: function () {
    if (this.type == "modify") {
      http.get(`/qnaapi/qna/${this.$route.params.qnano}`).then(({ data }) => {
        this.qnano = this.$route.params.qnano;
        this.subject = data.subject;
        this.content = data.content;
      });
    }
  },
};
</script>

<style></style>
