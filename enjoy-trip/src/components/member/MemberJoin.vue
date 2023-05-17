<template>
  <b-container>
    <br />
    <b-row>
      <b-col class="text-center">
        <h1 class="underline">회원가입</h1>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col>
        <b-form class="mx-auto w-50" @submit.prevent="checkValue">
          <b-form-group
            label="이름"
            label-for="username"
            description="이름을 입력하세요."
          >
            <b-form-input
              id="username"
              v-model="username"
              type="text"
              required
              ref="usename"
            ></b-form-input>
          </b-form-group>
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
          <b-form-group
            label="비밀번호확인"
            label-for="pwdcheck"
            description="비밀번호를 입력하세요."
          >
            <b-form-input
              id="pwdcheck"
              v-model="pwdcheck"
              type="text"
              required
              ref="pwdcheck"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="이메일"
            label-for="emailid"
            description="이메일을 입력하세요."
          >
            <b-input-group>
              <b-form-input
                id="emailid"
                v-model="emailid"
                type="text"
                required
                ref="emailid"
              ></b-form-input>
              <span class="input-group-text">@</span>
              <b-form-input
                id="emaildomain"
                v-model="emaildomain"
                type="text"
                required
                ref="emaildomain"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-button-group>
            <b-button id="registerButton" type="submit" variant="primary"
              >가입</b-button
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
      username: null,
      userid: null,
      userpwd: null,
      pwdcheck: null,
      emailid: null,
      emaildomain: null,
    };
  },
  methods: {
    ...mapActions(["joinMember"]),
    checkValue() {
      let err = true;
      let msg = "";
      !this.username &&
        ((msg = "이름을 입력해주세요"),
        (err = false),
        this.$refs.username.focus());
      err &&
        !this.userid &&
        ((msg = "아이디를 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.userpwd &&
        ((msg = "비밀번호를 입력해주세요"),
        (err = false),
        this.$refs.userpwd.focus());
      err &&
        !this.pwdcheck &&
        ((msg = "비밀번호확인을 입력해주세요"),
        (err = false),
        this.$refs.pwdcheck.focus());
      err &&
        !this.emailid &&
        ((msg = "이메일 아이디를 입력해주세요"),
        (err = false),
        this.$refs.emailid.focus());
      err &&
        !this.emaildomain &&
        ((msg = "이메일 도메인을 입력해주세요"),
        (err = false),
        this.$refs.emaildomain.focus());

      console.log(err);
      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.join();
    },
    join() {
      const thiz = this;
      this.joinMember({
        userName: this.username,
        userId: this.userid,
        userPwd: this.userpwd,
        emailId: this.emailid,
        emailDomain: this.emaildomain,
        callback: function (status) {
          if (status == 200) {
            thiz.$router.push({ name: "main" });
          }
        },
      });
    },
  },
};
</script>

<style></style>
