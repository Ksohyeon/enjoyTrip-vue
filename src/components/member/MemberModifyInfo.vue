<template>
  <b-container>
    <br />
    <b-row>
      <b-col class="text-center">
        <h1 class="underline">회원정보 수정</h1>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col>
        <b-form class="mx-auto w-50" @submit.prevent="modify">
          <b-form-group label="이름" label-for="username">
            <b-form-input
              id="username"
              v-model="getUserInfo.userName"
              type="text"
              required
              ref="usename"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="아이디" label-for="userid">
            <b-form-input
              id="userid"
              v-model="getUserInfo.userId"
              type="text"
              required
              ref="userid"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호" label-for="userpwd">
            <b-form-input
              id="userpwd"
              v-model="getUserInfo.userPwd"
              type="text"
              required
              ref="userpwd"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호확인" label-for="pwdcheck">
            <b-form-input
              id="pwdcheck"
              v-model="getUserInfo.userPwd"
              type="text"
              required
              ref="pwdcheck"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="이메일" label-for="emailid">
            <b-input-group>
              <b-form-input
                id="emailid"
                v-model="getUserInfo.emailId"
                type="text"
                required
                ref="emailid"
              ></b-form-input>
              <span class="input-group-text">@</span>
              <b-form-input
                id="emaildomain"
                v-model="getUserInfo.emailDomain"
                type="text"
                required
                ref="emaildomain"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-button-group>
            <b-button id="modifyButton" type="submit" variant="primary"
              >수정</b-button
            >
          </b-button-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["selectMember", "modifyMember"]),
    modify() {
      let thiz = this;
      this.modifyMember({
        userId: this.getUserInfo.userId,
        userName: this.getUserInfo.userName,
        userPwd: this.getUserInfo.userPwd,
        emailId: this.getUserInfo.emailId,
        emailDomain: this.getUserInfo.emailDomain,
        callback: function (status) {
          console.log(status);
          if (status == 200) {
            thiz.$router.push({ name: "userinfo" });
            window.location.reload();
          }
        },
      });
    },
  },
  created() {
    this.selectMember();
  },
};
</script>

<style></style>
