<template>
  <b-container>
    <br />
    <b-row>
      <b-col class="text-center">
        <h1 class="underline">로그인</h1>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col>
        <b-form class="mx-auto w-50" @submit.prevent="checkValue">
          <b-form-group
            label="아이디"
            label-for="userid"
            description="아이디를 입력하세요."
          >
            <b-form-input
              id="userid"
              v-model="userid"
              type="text"
              required
              ref="userid"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="비밀번호"
            label-for="userpwd"
            description="비밀번호를 입력하세요."
          >
            <b-form-input
              id="userpwd"
              v-model="userpwd"
              type="text"
              required
              ref="userpwd"
            ></b-form-input>
          </b-form-group>

          <b-button-group>
            <b-button id="loginButton" type="submit" variant="primary"
              >로그인</b-button
            >
          </b-button-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userid: null,
      userpwd: null,
    };
  },
  methods: {
    ...mapActions(["loginMember"]),
    checkValue() {
      let err = true;
      let msg = "";
      !this.userid &&
        ((msg = "아이디 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.userpwd &&
        ((msg = "비밀번호 입력해주세요"),
        (err = false),
        this.$refs.userpwd.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.login();
    },
    login() {
      const thiz = this;
      this.loginMember({
        userId: this.userid,
        userPwd: this.userpwd,
        callback: function (status) {
          console.log(status);
          if (status == 200) {
            thiz.$router.push({ name: "main" });
            window.location.reload();
            console.log(thiz.$store);
          }
        },
      });
    },
  },
};
</script>

<style></style>
