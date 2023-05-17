import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
// import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
  },
  getters: {
    checkLoginUser: function (state) {
      return state.userId;
    },
  },
  mutations: {
    LOGIN(state, payload) {
      console.log("스테이트", state);
      console.log("페이로드", payload);

      // 세션 스토리지에 로그인 정보 저장
      sessionStorage.setItem("userid", payload.loginuser.userId);
      sessionStorage.setItem("isadmin", payload.loginuser.admin);
      console.log("저장된 유저 아이디: " + sessionStorage.getItem("userid"));

      this.state.userId = payload.loginuser.userId;
      // console.log("state: ", state);
    },
  },
  actions: {
    loginMember(context, payload) {
      console.log("payload: ", payload);
      http
        .post(`/user/login`, payload)
        .then(({ data, status }) => {
          console.log("응답: ", data, status);
          context.commit({
            type: "LOGIN",
            loginuser: data,
          });
          this.state.userId = data.userId;
          payload.callback(status);
        })
        .catch((response) => {
          payload.callback(response.status);
        });
    },
    joinMember(context, payload) {
      console.log("context: ", context);
      console.log("payload: ", payload);
      http
        .post(`/user/join`, payload)
        .then(({ data, status }) => {
          console.log("응답: ", data, status);
          payload.callback(status);
        })
        .catch((response) => {
          payload.callback(response.status);
        });
    },
  },
  modules: {},
});
