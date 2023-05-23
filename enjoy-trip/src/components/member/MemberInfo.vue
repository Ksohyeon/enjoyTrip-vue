<template>
  <b-container class="bv-example-row mt-5 mx-auto w-50">
    <b-row>
      <b-table-simple>
        <b-thead>
          <b-tr>
            <b-tc> <b-td>사용자정보</b-td></b-tc>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-td>이름</b-td>
            <b-td>{{ getUserInfo.userName }}</b-td>
          </b-tr>
          <b-tr>
            <b-td>아이디</b-td>
            <b-td>{{ getUserInfo.userId }}</b-td>
          </b-tr>
          <b-tr>
            <b-td>닉네임</b-td>
            <b-td>{{ getUserInfo.nickName }}</b-td>
          </b-tr>
          <b-tr>
            <b-td>비밀번호</b-td>
            <b-td>{{ getUserInfo.userPwd }}</b-td>
          </b-tr>
          <b-tr>
            <b-td>이메일</b-td>
            <b-td
              >{{ getUserInfo.emailId }} @ {{ getUserInfo.emailDomain }}</b-td
            >
          </b-tr>
          <b-tr>
            <b-td>가입일</b-td>
            <b-td>{{ getUserInfo.joinDate }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-row>
    <b-row align-h="end">
      <b-col>
        <router-link :to="{ name: 'modifyInfo' }">수정</router-link>
      </b-col>
      <b-col>
        <b-button @click.prevent="deletemember">탈퇴</b-button>
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
    ...mapActions(["selectMember", "deleteMember"]),
    deletemember() {
      let thiz = this;
      this.deleteMember({
        callback: function (status) {
          console.log(status);
          if (status == 200) {
            thiz.$router.push({ name: "main" });
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
