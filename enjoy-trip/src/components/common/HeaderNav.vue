<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="white">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/img/enjoy-trip.png"
            class="d-inline-block align-middle"
            width="150px"
            alt="Kitten"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <b-icon icon="map" font-scale="1" variant="dark"></b-icon>
            <router-link :to="{ name: 'map' }" class="link"
              >&#9;여행지 검색</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><b-icon
              icon="calendar2-check"
              font-scale="1"
              variant="dark"
            ></b-icon
            ><router-link :to="{ name: '' }" class="link"
              >&#9;일정 만들기</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><b-icon icon="camera" font-scale="1" variant="dark"></b-icon
            ><router-link :to="{ name: '' }" class="link"
              >&#9;핫 플레이스</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><b-icon icon="chat" font-scale="1" variant="dark"></b-icon
            ><router-link :to="{ name: '' }" class="link"
              >&#9;지역별 채팅방</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item
            ><div class="navbar-dark">{{ message }}</div></b-nav-item
          >
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="person" font-scale="2" variant="dark"></b-icon>
            </template>
            <b-dropdown-item v-show="!loginCheck"
              ><router-link :to="{ name: 'join' }"
                >회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item v-show="!loginCheck"
              ><router-link :to="{ name: 'login' }"
                >로그인</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item v-show="loginCheck"
              ><router-link :to="{ name: 'userinfo' }"
                >사용자정보</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item v-show="loginCheck">
              <b-button
                v-show="loginCheck"
                variant="white"
                @click.prevent="logout"
                >로그아웃</b-button
              >
            </b-dropdown-item>

          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  date() {
    return {
      loginCheck: false,
      isadmin: false,
    };
  },
  computed: {
    message() {
      let userid = sessionStorage.getItem("userid");
      console.log(userid);
      if (userid == null) {
        return null;
      } else {
        return "안녕하세요 " + userid + " 님";

      }
    },
  },
  methods: {
    ...mapActions(["logoutMember"]),
    loginCheck() {
      let userid = sessionStorage.getItem("userid");
      let isadmin = sessionStorage.getItem("isadmin");
      console.log(
        "sessionStorage => userid: " + userid + " / isadmin: " + isadmin
      );
      if (userid == null) {
        console.log("로그아웃");
        this.loginCheck = false;
      } else if (isadmin == 1) {
        console.log("관리자 로그인");
        this.loginCheck = true;
      } else {
        console.log("로그인");
        this.loginCheck = true;
      }
    },
    logout() {
      console.log("logout method 실행");
      let thiz = this;
      this.logoutMember({
        callback: function (status) {
          console.log(status);
          if (status == 200) {
            thiz.$router.push({ name: "main" });
            window.location.reload();
          }
        },
      });
      window.location.reload();
    },
  },
  created() {
    this.loginCheck();
  },
};
</script>

<style>
.navbar-dark {
  color: black !important;
  text-align: center;
}
</style>
