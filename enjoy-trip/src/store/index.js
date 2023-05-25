import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
// import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    plan: [],
    myplan: null,
    ordered: [],
  },
  getters: {
    getUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    // 여행경로 저장
    SET_ORDERED(state, ordered) {
      state.ordered = ordered;
    },
    // 여행계획
    CREATE_PLAN_ITEM(state, planItem) {
      console.log(planItem);
      state.plan.push(planItem);
      console.log(state.plan);
    },
    DELETE_PLAN_ITEM(state, planItem) {
      const idx = state.plan.indexOf(planItem);
      state.plan.splice(idx, 1);
    },
    // 회원관리
    LOGIN(state, payload) {
      console.log("스테이트", state);
      console.log("페이로드", payload);

      // 세션 스토리지에 로그인 정보 저장
      sessionStorage.setItem("userid", payload.loginuser.userId);
      sessionStorage.setItem("isadmin", payload.loginuser.admin);
      console.log("저장된 유저 아이디: " + sessionStorage.getItem("userid"));

      // console.log("state: ", state);
    },
    LOGOUT() {
      sessionStorage.clear();
    },
    SELECT_MEMBER(state, payload) {
      this.state.userInfo = payload.user;
      console.log("userinfo", this.state.userInfo);
    },
  },
  actions: {
    // 여행경로 저장
    setOrdered(context, ordered) {
      console.log("serOrdered: ", ordered);
      context.commit("SET_ORDERED", ordered);
    },
    // 여행계획 등록
    registPlan(content, planToRegist) {
      console.log(planToRegist);
      http.post(`/plan`, planToRegist).then(({ data, status }) => {
        console.log("응답: ", data, status);
        planToRegist.callback(status);
      });
    },
    // 여행계획 만들기
    createPlan(context, planItem) {
      console.log(planItem);
      context.commit("CREATE_PLAN_ITEM", planItem);
    },
    deletePlan(context, planItem) {
      context.commit("DELETE_PLAN_ITEM", planItem);
    },
    // 회원관리
    loginMember(context, payload) {
      console.log("payload: ", payload);
      http
        .post(`/user/login`, payload)
        .then(({ data, status }) => {
          console.log("응답: ", data, status);
          if (status == 200) {
            context.commit({
              type: "LOGIN",
              loginuser: data,
            });
            this.state.userId = data.userId;
            payload.callback(status, data.userId);
          } else {
            alert("로그인 실패");
          }
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
    logoutMember(context, payload) {
      http.get(`/user/logout`).then((response) => {
        context.commit({
          type: "LOGOUT",
        });
        console.log(response, payload);
        // console.log("status: ", status);
        payload.callback(response.status);
      });
    },
    selectMember(context) {
      let userId = sessionStorage.getItem("userid");
      http.get(`/user/${userId}`).then((response) => {
        console.log(response);
        context.commit({
          type: "SELECT_MEMBER",
          user: response.data,
        });
      });
    },
    modifyMember(context, payload) {
      console.log("user:", payload);
      http.put(`/user/update`, payload).then(({ data, status }) => {
        console.log("응답: ", data, status);
        payload.callback(status);
      });
    },
    deleteMember(context, payload) {
      let userid = sessionStorage.getItem("userid");
      http.delete(`/user/${userid}`).then(({ data, status }) => {
        console.log("응답: ", data, status);
        payload.callback(status);
        sessionStorage.clear();
      });
    },
  },
  modules: {},
});
