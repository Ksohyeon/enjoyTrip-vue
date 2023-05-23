import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/MainView"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/MemberView"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/components/member/MemberLogin"),
      },
      {
        path: "join",
        name: "join",
        component: () => import("@/components/member/MemberJoin"),
      },
      {
        path: "userinfo",
        name: "userinfo",
        component: () => import("@/components/member/MemberInfo"),
      },
      {
        path: "modifyInfo",
        name: "modifyInfo",
        component: () => import("@/components/member/MemberModifyInfo"),
      },
    ],
  },
  {
    path: "/trip",
    name: "trip",
    component: () => import("@/views/TripView"),
    children: [
      {
        path: "map",
        name: "map",
        component: () => import("@/components/trip/TripMap"),
      },
      {
        path: "detail",
        name: "TripDetail",
        component: () => import("@/components/trip/TripDetail"),
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/QnaView"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: () => import("@/components/qna/QnaList"),
      },
      {
        path: "write",
        name: "QnaCreate",
        component: () => import("@/components/qna/QnaCreate"),
      },
      {
        path: "detail/:no",
        name: "QnaDetail",
        component: () => import("@/components/qna/QnaDetail"),
      },
      {
        path: "modify/:no",
        name: "QnaModify",
        component: () => import("@/components/qna/QnaModify"),
      },
      {
        path: "delete/:no",
        name: "QnaDelete",
        component: () => import("@/components/qna/QnaDelete"),
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import("@/views/PlanView"),
    redirect: "/plan/main",
    children: [
      {
        path: "main",
        name: "PlanMain",
        component: () => import("@/components/plan/PlanMain"),
      },
      {
        path: "create",
        name: "PlanCreate",
        component: () => import("@/components/plan/PlanCreate"),
      },
      {
        path: "board",
        name: "PlanBoard",
        component: () => import("@/components/plan/PlanBoard"),
      },
      {
        path: "detail/:no",
        name: "PlanDetail",
        component: () => import("@/components/plan/PlanDetail"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
